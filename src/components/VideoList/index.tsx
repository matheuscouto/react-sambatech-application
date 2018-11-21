import * as React from 'react';
import { IVideoItem } from 'declarations';
import { database } from '../../services/firebase';
import { assign } from 'lodash';
import VideoLoader from './VideoLoader';
import styles from './styles';
import VideoItem from './VideoItem';

interface IState {
  isLoadingVideos: boolean;
  videoList: IVideoItem[];
}

class VideoList extends React.PureComponent<{},IState> {
  public state:IState = {
    isLoadingVideos: true,
    videoList: [],
  }

  private dbPath = database().ref('/videos').orderByChild('creationTimeOrder');

  public componentDidMount() {
    this.dbPath.on('value', () => {
      this.dbPath.limitToFirst(3).once('value', (videoListSnapshot) => {
        let videoList: any = [];
        if(videoListSnapshot) {
          videoListSnapshot.forEach(videoItem => { videoList.push(assign(videoItem.val(), { id: videoItem.key }))})
        }
        this.setState(state => ({
          ...state,
          videoList,
          isLoadingVideos: false,
        }))
      })
    })
  }

  public componentWillUnmount() {
    this.dbPath.off('value');
  }
	public render() {
    const { isLoadingVideos, videoList } = this.state;
		return(
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
		);
	}
}

export default VideoList;