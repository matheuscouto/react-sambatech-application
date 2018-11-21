import * as React from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import { selectSelectVideoOnDisplay } from 'src/store/app/state';
import { IRootState } from 'src/store';

interface IState {
	videoOnDisplayStyle: React.CSSProperties;
}

class Videos extends React.PureComponent<IMapStateToProps, IState> {
	
	public state = {
		videoOnDisplayStyle: styles.videoOnDisplay,
	}

	private videoPlayer:any;

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
					height: 'calc(733px*9/16)',
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
					? <video width="100%" controls ref={ ref => this.videoPlayer = ref} >
							<source src={videoOnDisplay.url} type="video/mp4" />
							Unfortunately, your browser do not support videos.
						</video>
					: null
				}
      </div>
		);
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

export default connect(mapStateToProps)(Videos);

