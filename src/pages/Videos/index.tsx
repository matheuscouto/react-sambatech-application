import * as React from 'react';
import { Stylesheet } from 'declarations';
import { VideoList, VideoOnDisplay } from '../../components';
import { RouteComponentProps } from 'react-router-dom';
// tslint:disable
class Videos extends React.PureComponent<RouteComponentProps<{ id?: string }>> {
	public render() {
		const { id } = this.props.match.params;
		const { push } = this.props.history;
		return(
			<div style={styles.container}>
				<VideoOnDisplay />
				<VideoList videoIdToDisplay={id} pushHistory={push} />
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
