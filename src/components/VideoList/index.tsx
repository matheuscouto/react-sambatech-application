import * as React from 'react';
import { IVideoItem } from 'declarations';
import { database } from '../../services/firebase';
import { assign } from 'lodash';
import VideoLoader from './VideoLoader';
import styles from './styles';
import VideoItem from './VideoItem';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

interface IState {
  isLoadingVideos: boolean;
  videoList: IVideoItem[];
  pagination: {
    current: number,
    total: number,
  }
}

class VideoList extends React.PureComponent<{},IState> {
  public state:IState = {
    isLoadingVideos: true,
    videoList: [],
    pagination: {
      current: 1,
      total: 1,
    }
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
    const { isLoadingVideos, videoList, pagination } = this.state;
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
                          thumbnails={videoItem.thumbnails}
                        />
                      ))
        }
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

}

export default VideoList;