import * as React from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import { selectSelectVideoOnDisplay } from '../../store/app/state';
import { IRootState } from '../../store';

interface IState {
	videoOnDisplayStyle: React.CSSProperties;
	windowWidth?: number;
}

//  COMPONENT: VideoOnDisplay
//  ROLE: Receive the url of the users selected video and
//				use it to display the video to the user.
//
//	Also it deals with the UI transaction when the user
//	selects the video.


export class VideoOnDisplay extends React.PureComponent<IMapStateToProps, IState> {
	
	public state:IState = {
		videoOnDisplayStyle: styles.videoOnDisplay,
		windowWidth: 200
	}

	private videoPlayer:any;

	public componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
		const { videoOnDisplay } = this.props;
		if(videoOnDisplay) {
			this.setState(state => ({
				...state,
				videoOnDisplayStyle: {
					...state.videoOnDisplayStyle,
					height: `calc(${window.innerWidth-120}px*9/16)`,
					marginBottom: 60,
				},
			}))
		}
	}

	public componentDidUpdate(prevProps: IMapStateToProps, prevState: IState) {
		const { videoOnDisplay } = this.props;
		
		if(videoOnDisplay && prevProps.videoOnDisplay && videoOnDisplay.url !== prevProps.videoOnDisplay.url) {
      this.videoPlayer.load()
    }
    if(videoOnDisplay && !prevProps.videoOnDisplay ) {
			this.setState(state => ({
				...state,
				videoOnDisplayStyle: {
					...state.videoOnDisplayStyle,
					height: `calc(${window.innerWidth-100}px*9/16)`,
					marginBottom: 60,
				},
			}))
		}
		if(!videoOnDisplay && prevProps.videoOnDisplay) {
			this.setState(state => ({
				...state,
				videoOnDisplayStyle: {
					...state.videoOnDisplayStyle,
					height: 0,
					marginBottom: 0,
				},
			}))
		}
	}

	public render() {
    const { videoOnDisplay } = this.props;
		const { videoOnDisplayStyle } = this.state;
		return(
      <div style={videoOnDisplayStyle} >
				{
					videoOnDisplay
					? <video width="100%" controls ref={ ref => this.videoPlayer = ref} autoPlay >
							<source src={videoOnDisplay.url} type="video/mp4" />
							Unfortunately, your browser do not support videos.
						</video>
					: null
				}
      </div>
		);
	}

	private updateDimensions = () => {
		if(this.props.videoOnDisplay) {
			this.setState(state => ({
				...state,
				videoOnDisplayStyle: {
					...state.videoOnDisplayStyle,
					height: `calc(${window.innerWidth-100}px*9/16)`,
				},
			}))
		}
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

export default connect(mapStateToProps)(VideoOnDisplay);

