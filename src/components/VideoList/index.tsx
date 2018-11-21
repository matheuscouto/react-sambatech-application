import * as React from 'react';
import { IVideoItem } from 'declarations';
import { database } from '../../services/firebase';
import { assign } from 'lodash';
import VideoLoader from './VideoLoader';
import styles from './styles';
import VideoItem from './VideoItem';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Modal from 'react-responsive-modal';

interface IState {
  isLoadingVideos: boolean;
  videoList: IVideoItem[];
  pagination: {
    current: number,
    total: number,
  };
  isArquivingVideo: boolean;
  arquivingVideoTitle?: string;
  arquivingVideoId?: string;
  newVideoTitle: string;
  isEditingVideoTitle: boolean;
  editingVideoTitleId?: string;
}

class VideoList extends React.PureComponent<{},IState> {
  public state:IState = {
    isLoadingVideos: true,
    videoList: [],
    pagination: {
      current: 1,
      total: 1,
    },
    isArquivingVideo: false,
    isEditingVideoTitle: false,
    newVideoTitle: '',
  }

  private dbPath = database().ref('/videos').orderByChild('creationTimeOrder');

  public componentDidMount() {
    this.dbPath.on('value', () => {
      this.dbPath.limitToFirst(3).once('value', (videoListSnapshot) => {
        let videoList: any = [];
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
  }
	public render() {
    const { editingVideoTitleId, isEditingVideoTitle, newVideoTitle, isLoadingVideos, videoList, pagination, isArquivingVideo, arquivingVideoTitle, arquivingVideoId } = this.state;
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
          : videoList.map((videoItem: IVideoItem) => (
                        <VideoItem
                          key={videoItem.id}
                          title={videoItem.name}
                          status={videoItem.status}
                          arquiveVideo={this.handleOpenArquiveVideoModal(videoItem.id)}
                          thumbnails={videoItem.thumbnails}
                          editVideoTitle={this.handleOpenEditVideoTitleModal(videoItem.id)}
                        />
                      ))
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
    const { videoList } = this.state;
    let pivotVideo: IVideoItem, rootRef:database.Query; 

    if(direction==='next') {
      pivotVideo = videoList[videoList.length - 1];
      rootRef = this.dbPath.limitToFirst(4).startAt(pivotVideo.creationTimeOrder)
    } else {
      pivotVideo = videoList[0];
      rootRef = this.dbPath.limitToLast(4).endAt(pivotVideo.creationTimeOrder)
    }
    
    rootRef.once('value').then((videoListSnapshot) => {

      let videoList: any = [];
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
      let updates: any = {};
      updates[`/videos/${videoId}`] = null;
      updates[`/arquivedVideos/${videoId}`] = videoItemSnapshot.val();
      database().ref('/videosCount').once('value').then((videosCountSnapshot) => {
        const videosCount = videosCountSnapshot.val();
        updates[`/videosCount`] = videosCount - 1;
        database().ref().update(updates).then(() => {
          this.handleCloseArquiveVideoModal()
        })
      })
    })
  }
}

export default VideoList;