import * as React from 'react';
import { Stylesheet } from 'declarations';
import { VideoList, VideoOnDisplay } from '../../components';

class Videos extends React.PureComponent<{}> {
	public render() {
		return(
			<div style={styles.container}>
				<VideoOnDisplay />
				<VideoList />
			</div>
		);
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
