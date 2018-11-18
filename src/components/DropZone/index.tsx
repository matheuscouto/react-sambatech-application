import * as React from 'react';
import Dropzone from 'react-dropzone';
import styles from './styles';
import Circle from 'react-circle';
import { IoIosCloudUpload, IoIosCheckmark } from 'react-icons/io';

interface IProps {
  uploadProgress: number;
  cancelUpload: () => void;
}

interface IState {
  dropZoneActive: boolean,
  dropzone: React.CSSProperties,
  circleWrapper: React.CSSProperties,
  uploadIcon: React.CSSProperties,
  doneIcon: React.CSSProperties,
  pickFile: React.CSSProperties,
  cancelUploadButton: React.CSSProperties,
  callToAction: React.CSSProperties,
}

class DropZoneComponent extends React.PureComponent<IProps, IState> {
	public state = {
		dropZoneActive: false,
		dropzone: styles.dropzone,
		circleWrapper: styles.circleWrapper,
		uploadIcon: styles.uploadIcon,
		doneIcon: styles.doneIcon,
		pickFile: styles.actionLink,
		cancelUploadButton: styles.actionLink,
		callToAction: styles.callToAction,
	}

	public componentDidMount() {
		this.setState((state) => ({
			...state,
			cancelUploadButton: {
				...state.cancelUploadButton,
				display: 'none'
			}
		}))
	}

	public render() {
    const { uploadProgress, cancelUpload } = this.props;
		const { circleWrapper, uploadIcon, doneIcon, pickFile, cancelUploadButton, callToAction } = this.state;
		return(
      <Dropzone
        style={this.state.dropzone}
        rejectStyle={styles.rejectDropzone}
        acceptStyle={styles.acceptDropzone}
        accept="video/*"
        onDropAccepted={this.onDrop}
        multiple={false}
        maxSize={1024 * 1000 * 1000 * 5} // Maximum filesize is 5gb
      >
        <p style={callToAction}>Drop to upload your files</p>
        <IoIosCloudUpload size='35%' style={uploadIcon} />
        <IoIosCheckmark size='30%' style={doneIcon} />
        <div style={circleWrapper}>
          <Circle progress={uploadProgress} lineWidth="8" size="35%" showPercentage={false} showPercentageSymbol={false} animate={true} progressColor="#2DCC70" />
        </div>
        <div style={pickFile}>
          <p style={{fontSize: 12, cursor: 'arrow'}}>or &nbsp;</p>
          <p style={{color: '#059BE2', fontSize: 12, fontWeight: 600, cursor: 'pointer'}}>select a file manually</p>
        </div>
        <div style={cancelUploadButton}>
          <p style={{color: '#FF5C54', fontSize: 12, fontWeight: 600, cursor: 'pointer'}}  onClick={cancelUpload}>cancel</p>
        </div>
      </Dropzone>
		);
	}

	private onDrop = () => {
		this.setState((state) => ({
			...state, 
			dropZoneActive: true, 
			dropzone: {
				...state.dropzone,
				borderColor:'#2DCC70',
			},
			circleWrapper: {
				...state.circleWrapper,
				opacity: 1,
			},
			uploadIcon: {
				...state.uploadIcon,
				opacity: 0,
			},
			pickFile: {
				...state.pickFile,
				opacity: 0,
				display: 'none'
			},
			cancelUploadButton: {
				...state.pickFile,
				opacity: 1,
				display: 'block'
			},
			callToAction: {
				...state.callToAction,
				opacity: 0,
				display: 'none'
			}
		}))
	}
}

export default DropZoneComponent;