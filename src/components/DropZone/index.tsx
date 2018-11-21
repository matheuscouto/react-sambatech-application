import * as React from 'react';
import Dropzone from 'react-dropzone';
import styles from './styles';
import Circle from 'react-circle';
import { IoIosCloudUpload, IoIosCheckmark } from 'react-icons/io';
import { cancelUpload } from 'src/services/api';
import Modal from 'react-responsive-modal';

interface IProps {
  uploadProgress?: number;
	uploadFiles: (files: any[], filename: string) => void;
	resetUpload: () => void;
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
	sendAgain: React.CSSProperties,
	isTypingVideoTitle: boolean,
	files?: any,
	filename: string,
	didDropUnsuportedFileType: boolean,
}

class DropZoneComponent extends React.PureComponent<IProps, IState> {
	public state: IState = {
		dropZoneActive: false,
		dropzone: styles.dropzone,
		circleWrapper: styles.circleWrapper,
		uploadIcon: styles.uploadIcon,
		doneIcon: styles.doneIcon,
		pickFile: styles.actionLink,
		sendAgain: styles.actionLink,
		cancelUploadButton: styles.actionLink,
		callToAction: styles.callToAction,
		isTypingVideoTitle: false,
		didDropUnsuportedFileType: false,
		filename: '',
	}

	public componentDidMount() {
		if(this.props.uploadProgress) {
			if(this.props.uploadProgress===100) {
				this.uploadCompleteTransition();
			} else {
				this.isUploadingTransition();
			}
		} else {
			this.setState((state) => ({
				...state,
				cancelUploadButton: {
					...state.cancelUploadButton,
					display: 'none',
				},
				sendAgain: {
					...state.sendAgain,
					opacity: 0,
					display: 'none',
				},
			}))
		}
	}

	public componentDidUpdate(prevProps: IProps) {
		if(this.props.uploadProgress === 100 && prevProps.uploadProgress !== this.props.uploadProgress) {
			this.uploadCompleteTransition();
		}
		if(prevProps.uploadProgress && !this.props.uploadProgress) {
			this.uploadResetTransaction()
		}
	}

	public render() {
    const { uploadProgress } = this.props;
		const { didDropUnsuportedFileType, circleWrapper, uploadIcon, doneIcon, pickFile, cancelUploadButton, callToAction, sendAgain, isTypingVideoTitle, filename } = this.state;
		return(
      <Dropzone
        style={this.state.dropzone}
        rejectStyle={styles.rejectDropzone}
        acceptStyle={styles.acceptDropzone}
        accept="video/*"
				onDropAccepted={this.onDrop}
				onDropRejected={this.handleOpenUnsuportedFileTypeWarning}
        multiple={false}
				maxSize={1024 * 1000 * 1000 * 5} // Maximum filesize is 5gb
				disabled={!!this.props.uploadProgress || isTypingVideoTitle || didDropUnsuportedFileType}
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
          <p style={{color: '#FF5C54', fontSize: 12, fontWeight: 600, cursor: 'pointer'}}  onClick={this.handleCancel}>cancel</p>
        </div>
        <div style={sendAgain}>
          <p style={{color: '#059BE2', fontSize: 12, fontWeight: 600, cursor: 'pointer'}} onClick={this.handleReset}>send another one</p>
        </div>
				<Modal open={isTypingVideoTitle} styles={styles.modal} onClose={this.handleCloseVideoTitleModal} center showCloseIcon={false} closeOnEsc={false} closeOnOverlayClick={false} >
					<h2 style={styles.modalTitle}>What's going to be the new title?</h2>
					<input style={styles.editInput} value={filename} onChange={this.handleInputChange} />
					<div style={styles.modalOptionsWrapper}>
						<p style={styles.modalOptionConfirm} onClick={this.handleSubmitFiles}>CONFIRM</p>
					</div>
				</Modal>
				<Modal open={didDropUnsuportedFileType} styles={styles.modal} onClose={this.handleCloseUnsuportedFileTypeWarning} center>
					<h2 style={styles.modalTitle}>Ops! This file is not a video, please drop any type of video here.</h2>
				</Modal>
      </Dropzone>
		);
	}

  private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    this.setState(state => ({
      ...state,
      filename: title,
    }))
  }

	private handleSubmitFiles = () => {
		const { files, filename } = this.state;
		this.props.uploadFiles(files, filename);
		this.handleCloseVideoTitleModal();
	}

  private handleCloseVideoTitleModal = () => {
    this.setState(state => ({
      ...state,
      isTypingVideoTitle: false,
			filename: '',
    }))
  }

  private handleCloseUnsuportedFileTypeWarning = () => {
    this.setState(state => ({
      ...state,
      didDropUnsuportedFileType: false,
    }))
  }

  private handleOpenUnsuportedFileTypeWarning = () => {
    this.setState(state => ({
      ...state,
      didDropUnsuportedFileType: true,
    }))
  }

	private onDrop = (files: any) => {
    this.setState(state => ({
      ...state,
			isTypingVideoTitle: true,
			files,
    }));
		this.isUploadingTransition();
	}

	private handleCancel = () => {
		cancelUpload();
		this.props.resetUpload();
		this.uploadResetTransaction();
	}

	private handleReset = () => {
		this.props.resetUpload();
		this.uploadResetTransaction();
	}

	private isUploadingTransition = () => this.setState((state) => ({
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
		},
		sendAgain: {
			...state.sendAgain,
			opacity: 0,
			display: 'none'
		},
	}))

	private uploadCompleteTransition = () => this.setState((state) => ({
		...state,
		dropzone: {
			...state.dropzone,
			borderColor:'#2DCC70',
		},
		doneIcon: {
			...state.doneIcon,
			opacity: 1,
		},
		cancelUploadButton: {
			...state.cancelUploadButton,
			opacity: 0,
		},
		sendAgain: {
			...state.sendAgain,
			opacity: 1,
			display: 'block'
		},
		callToAction: {
			...state.callToAction,
			opacity: 0,
			display: 'none'
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
	}))

	private uploadResetTransaction = () => this.setState(state => ({
		...state,
		circleWrapper: {
			...state.circleWrapper,
			opacity: 0,
		},
		dropzone: {
			...state.dropzone,
			borderColor:'#DADBDA',
		},
		uploadIcon: {
			...state.uploadIcon,
			opacity: 1,
		},
		pickFile: {
			...state.pickFile,
			opacity: 1,
			display: 'flex'
		},
		callToAction: {
			...state.callToAction,
			opacity: 1,
			display: 'block'
		},
		cancelUploadButton: {
			...state.cancelUploadButton,
			opacity: 0,
		},
		doneIcon: {
			...state.doneIcon,
			opacity: 0,
		},
		sendAgain: {
			...state.sendAgain,
			opacity: 0,
			display: 'none'
		},
	}))
}

export default DropZoneComponent;