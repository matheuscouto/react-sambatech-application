import * as React from 'react';
import { Stylesheet } from 'declarations';
import { DropZone } from 'src/components';

class Upload extends React.PureComponent<any,any> {

	public render() {
		return(
			<div style={styles.container}>
				<DropZone uploadProgress={35} cancelUpload={this.cancelUpload} />
			</div>
		);	
	}

	private cancelUpload = () => null
}

const styles:Stylesheet = {
	container: {
		alignSelf: 'center',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
	}
};

export default Upload;