import * as React from 'react';
import styles from './styles';

interface IProps {
  videoOnDisplay?: string;
}

interface IState {
	videoOnDisplayStyle: React.CSSProperties;
}

class Videos extends React.PureComponent<IProps, IState> {
	
	public state = {
		videoOnDisplayStyle: styles.videoOnDisplay,
	}

	private videoPlayer:any;

	public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { videoOnDisplay } = this.props;
		if(this.props.videoOnDisplay !== prevProps.videoOnDisplay) {
      this.videoPlayer.load()
    }
    if(videoOnDisplay && !prevProps.videoOnDisplay ) {
			this.setState(state => ({
				...state,
				videoOnDisplayStyle: {
					...state.videoOnDisplayStyle,
					height: 'calc(733px*9/16)',
					marginBottom: 60,
				},
			}))
    }
	}

	public render() {
    const { videoOnDisplay } = this.props;
		const { videoOnDisplayStyle } = this.state;
		return(
      <div style={videoOnDisplayStyle} >
        <video width="100%" controls ref={ ref => this.videoPlayer = ref} >
          <source src={videoOnDisplay} type="video/mp4" />
          Unfortunately, your browser do not support videos.
        </video>
      </div>
		);
	}
}

export default Videos;

