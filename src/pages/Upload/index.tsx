import * as React from 'react';
import { Stylesheet } from 'declarations';
import { DropZone } from 'src/components';
import { connect } from 'react-redux';
import { selectUploadProgress, uploadFiles, resetUpload } from 'src/store/app/state';
import { IRootState } from 'src/store';
import { Dispatch } from 'redux';

class Upload extends React.PureComponent<IMapDispatchToProps & IMapStateToProps> {

	public render() {
		return(
			<div style={styles.container}>
				<DropZone uploadProgress={this.props.uploadProgress} resetUpload={this.props.resetUpload} uploadFiles={this.uploadFiles} />
			</div>
		);
	}

  private uploadFiles = (files:any[], filename: string) => {
    const file = files[0];
    const formData = new FormData();
    formData.append('video', file);
		formData.append('name', filename);
		this.props.uploadFiles(formData)
	}
}

const styles:Stylesheet = {
	container: {
		alignSelf: 'center',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
		width: '100%',
	}
};


/* *************************** */
//      MAP STATE TO PROPS     //
/* *************************** */

interface IMapStateToProps {
	uploadProgress?: number;
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
	uploadProgress: selectUploadProgress(state)
});

/* *************************** */
//    MAP DISPATCH TO PROPS    //
/* *************************** */

interface IMapDispatchToProps {
	uploadFiles: (formData: FormData) => void;
	resetUpload: () => void;
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
	uploadFiles: (formData) => dispatch(uploadFiles.started(formData)),
	resetUpload: () => dispatch(resetUpload()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Upload);