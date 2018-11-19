import * as React from 'react';
import { Stylesheet } from 'declarations';
import { VideoList, VideoOnDisplay } from '../../components';

interface IState {
	videoOnDisplay?: string;
}

class Videos extends React.PureComponent<{}, IState> {
	public state:IState = {}

	public render() {
		const { videoOnDisplay } = this.state;
		return(
			<div style={styles.container}>
				<VideoOnDisplay videoOnDisplay={videoOnDisplay} />
				<VideoList onSelectVideo={this.onSelectVideo} />
			</div>
		);
	}

	private onSelectVideo = (videoUrl: string) => () => {
		this.setState({
			videoOnDisplay: videoUrl
		})
	}
}

export default Videos;

const styles:Stylesheet = {
	container: {
		width: 753, 
		borderColor:'transparent',
		borderWidth: 0,
		borderStyle: 'solid',
		justifyContent: 'flex-start'
	},
}
