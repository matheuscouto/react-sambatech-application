import * as React from 'react';
import styles from './styles';
import VideoItem from './VideoItem';

interface IProps {
  onSelectVideo: (videoUrl: string) => () => void
}

class Videos extends React.PureComponent<IProps> {
	public render() {
    const { onSelectVideo } = this.props;
		return(
      <div style={styles.videoList}>
        {/* TODO: Fetch video items from Firebase */}
        <VideoItem onSelectVideo={onSelectVideo("")} title="Video title" status="done" thumbnails={[""]}/>
      </div>
		);
	}
}

export default Videos;