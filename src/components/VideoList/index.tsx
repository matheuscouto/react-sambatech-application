import * as React from 'react';
import { IVideoItem } from 'declarations';
import styles from './styles';
import VideoItem from './VideoItem';
import { assign } from 'lodash';
import { database } from '../../services/firebase';
import Modal from 'react-responsive-modal';
import { removeVideoFromDisplay, putVideoOnDisplay, selectSelectVideoOnDisplay } from 'src/store/app/state';
import { Dispatch } from 'redux';
import { IRootState } from 'src/store';
import { connect } from 'react-redux';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import VideoLoader from './VideoLoader';

interface IState {
  isLoadingVideos: boolean;
  videoList: IVideoItem[];
  isArquivingVideo: boolean;
  arquivingVideoTitle?: string;
  arquivingVideoId?: string;
  newVideoTitle: string;
  isEditingVideoTitle: boolean;
  editingVideoTitleId?: string;
  pagination: {
    current: number,
    total: number,
  }
}

class VideoList extends React.PureComponent<IMapStateToProps & IMapDispatchToProps, IState> {
  public state:IState = {
    isLoadingVideos: true,
    videoList: [],
    isArquivingVideo: false,
    isEditingVideoTitle: false,
    newVideoTitle: '',
    pagination: {
      current: 1,
      total: 1,
    }
  }

  private dbPath = database().ref('/videos').orderByChild('creationTimeOrder');

  public componentDidMount() {
    this.dbPath.on('value', () => {
      this.dbPath.limitToFirst(3).once('value', (videoListSnapshot) => {
        const videoList: any = [];
        if(videoListSnapshot) {
          videoListSnapshot.forEach(videoItem => { videoList.push(assign(videoItem.val(), { id: videoItem.key }))})
        }
        database().ref('/videosCount').once('value').then((videosCountSnapshot) => {
          const videosCount = !videosCountSnapshot.val() ? 0 : videosCountSnapshot.val();
          this.setState(state => ({
            ...state,
            videoList,
            pagination: {
              current: 1,
              total: !((videosCount/3) % 1) ? videosCount/3 : (Number((videosCount/3).toString().split('.')[0]) + 1),
            },
            isLoadingVideos: false,
          }))
        })
      })
    })
  }

  public componentWillUnmount() {
    this.dbPath.off('value');
    this.props.removeVideoFromDisplay();
  }

	public render() {
    const { pagination, isLoadingVideos, isArquivingVideo, arquivingVideoTitle, arquivingVideoId, newVideoTitle, isEditingVideoTitle, editingVideoTitleId } = this.state;
		return(
      <div style={styles.videoListWrapper}>
        <div style={styles.paginationButtonsWrapper}>
          <IoIosArrowBack size={23} onClick={pagination.current > 1 ? this.getPage('previous') : undefined} style={styles.paginationButton} color={pagination.current === 1 ? 'rgb(170, 170, 170)' : undefined} />
          <p style={styles.paginationButtonsPage}>{this.state.pagination.current} / {this.state.pagination.total}</p>
          <IoIosArrowForward size={23} onClick={pagination.current < pagination.total ? this.getPage('next') : undefined} style={styles.paginationButton} color={pagination.current >= pagination.total ? 'rgb(170, 170, 170)' : undefined} />
        </div>
        <div style={styles.videoList}>
          {
            isLoadingVideos
            ? <VideoLoader />
            : this.state.videoList.map((videoItem: IVideoItem) => <VideoItem
                                                                    key={videoItem.id}
                                                                    onSelectVideo={this.handlePutVideoOnDisplay(videoItem.id, videoItem.high)}
                                                                    title={videoItem.name}
                                                                    status={videoItem.status}
                                                                    thumbnails={videoItem.thumbnails}
                                                                    arquiveVideo={this.handleOpenArquiveVideoModal(videoItem.id)}
                                                                    editVideoTitle={this.handleOpenEditVideoTitleModal(videoItem.id)}
                                                                  />
                                    )
          }

        <Modal open={isArquivingVideo} styles={styles.modal} onClose={this.handleCloseArquiveVideoModal} center>
          <h2 style={styles.modalTitle}>Are you sure you want to delete "{arquivingVideoTitle}" ?</h2>
          <div style={styles.modalOptionsWrapper}>
            <p style={styles.modalOptionCancel} onClick={this.handleCloseArquiveVideoModal}>CANCEL</p>
            <p style={styles.modalOptionConfirm} onClick={this.handleArquiveVideo(arquivingVideoId!)}>CONFIRM</p>
          </div>
        </Modal>
        <Modal open={isEditingVideoTitle} styles={styles.modal} onClose={this.handleCloseEditVideoTitleModal} center>
          <h2 style={styles.modalTitle}>What's going to be the new title?</h2>
          <input style={styles.editInput} value={newVideoTitle} onChange={this.handleInputChange} />
          <div style={styles.modalOptionsWrapper}>
            <p style={styles.modalOptionCancel} onClick={this.handleCloseEditVideoTitleModal}>CANCEL</p>
            <p style={styles.modalOptionConfirm} onClick={this.handleEditVideoTitle(editingVideoTitleId!)}>CONFIRM</p>
          </div>
        </Modal>
        </div>
      </div>
		);
  }

  private getPage = (direction: 'next' | 'previous') => () => {
    this.setState(state => ({
      ...state,
      isLoadingVideos: true,
    }))
    let pivotVideo: IVideoItem;
    let rootRef:database.Query; 

    if(direction==='next') {
      pivotVideo = this.state.videoList[this.state.videoList.length - 1];
      rootRef = this.dbPath.limitToFirst(4).startAt(pivotVideo.creationTimeOrder)
    } else {
      pivotVideo = this.state.videoList[0];
      rootRef = this.dbPath.limitToLast(4).endAt(pivotVideo.creationTimeOrder)
    }
    
    rootRef.once('value').then((videoListSnapshot) => {

      const videoList: any = [];
      if(videoListSnapshot) {
        videoListSnapshot.forEach(videoItem => { if(videoItem.key !== pivotVideo.id) { videoList.push(assign(videoItem.val(), { id: videoItem.key }))}})
      }
      database().ref('/videosCount').once('value').then((videosCountSnapshot) => {
        const videosCount = !videosCountSnapshot.val() ? 0 : videosCountSnapshot.val();
        const nextCurrentPage = direction === 'next' ? this.state.pagination.current + 1 : this.state.pagination.current - 1
        this.setState(state => ({
          ...state,
          videoList, 
          pagination: {
            current: nextCurrentPage, //
            total: !((videosCount/3) % 1) ? videosCount/3 : (Number((videosCount/3).toString().split('.')[0]) + 1),
          },
          isLoadingVideos: false,
        }))
      })
    })
  }

  private handlePutVideoOnDisplay = (videoId: string, videoUrl: string) => () => {
    this.props.putVideoOnDisplay(videoUrl, videoId)
  }

  private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    this.setState(state => ({
      ...state,
      newVideoTitle: title,
    }))
  }

  private handleOpenEditVideoTitleModal = (videoId: string) => (videoTitle: string) => () => {
    this.setState(state => ({
      ...state,
      isEditingVideoTitle: true,
      newVideoTitle: videoTitle,
      editingVideoTitleId: videoId,
    }))
  }

  private handleCloseEditVideoTitleModal = () => {
    this.setState(state => ({
      ...state,
      isEditingVideoTitle: false,
    }))
  }

  private handleEditVideoTitle = (videoId: string) => () => {
    const { newVideoTitle } = this.state;
    database().ref(`/videos/${videoId}/name`).set(newVideoTitle);
    this.handleCloseEditVideoTitleModal();
  }

  private handleOpenArquiveVideoModal = (videoId: string) => (videoTitle: string) => () => {
    this.setState(state => ({
      ...state,
      isArquivingVideo: true,
      arquivingVideoTitle: videoTitle,
      arquivingVideoId: videoId,
    }))
  }

  private handleCloseArquiveVideoModal = () => {
    this.setState(state => ({
      ...state,
      isArquivingVideo: false,
    }))
  }

  private handleArquiveVideo = (videoId: string) => () => {
    database().ref(`/videos/${videoId}`).once('value').then((videoItemSnapshot) => {
      const updates: any = {};
      updates[`/videos/${videoId}`] = null;
      updates[`/arquivedVideos/${videoId}`] = videoItemSnapshot.val();
      database().ref('/videosCount').once('value').then((videosCountSnapshot) => {
        const videosCount = videosCountSnapshot.val();
        updates[`/videosCount`] = videosCount - 1;
        database().ref().update(updates).then(() => {
          if(this.props.videoOnDisplay && this.props.videoOnDisplay.id === videoId) {
            this.props.removeVideoFromDisplay()
          }
          this.handleCloseArquiveVideoModal()
        })
      })
    })
  }
}

/* *************************** */
//      MAP STATE TO PROPS     //
/* *************************** */

interface IMapStateToProps {
	videoOnDisplay?: {url: string, id: string};
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
	videoOnDisplay: selectSelectVideoOnDisplay(state)
});

/* *************************** */
//    MAP DISPATCH TO PROPS    //
/* *************************** */

interface IMapDispatchToProps {
	putVideoOnDisplay: (url: string, id: string) => void;
	removeVideoFromDisplay: () => void;
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
	putVideoOnDisplay: (url, id) => dispatch(putVideoOnDisplay({url, id})),
	removeVideoFromDisplay: () => dispatch(removeVideoFromDisplay()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
