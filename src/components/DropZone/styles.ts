import { Stylesheet } from "declarations";

const dropzoneSharedStyle: React.CSSProperties = {
	borderStyle:'dashed',
	borderWidth: 2,
	borderRadius: 8,
	maxWidth: 749, 
	width: '100%',
	height: 400,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	transition: "all 0.3s ease-out",
}

const styles:Stylesheet = {
	dropzone: {
		borderColor:'#DADBDA',
		...dropzoneSharedStyle,
	},
	acceptDropzone: {
		borderColor:'#2DCC70',
		...dropzoneSharedStyle,
	},
	rejectDropzone: {
		borderColor:'#FF5C54',
		...dropzoneSharedStyle,
	},
	circleWrapper: {
		display: 'flex',
		justifyContent: 'center',
		opacity: 0,
		// transition: "all 0.3s ease-out",
	},
	uploadIcon: { position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', transition: "all 0.2s ease-out", color: '#DADBDA', opacity: 0.5 },
	doneIcon: { position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', transition: "all 0.2s ease-out", color: '#2DCC70', opacity: 0 },
	actionLink: { display: 'flex', left: '50%', transform: 'translate(-50%, 0)', position: 'absolute', bottom: '20%', transition: "all 0.2s ease-out", color: "#999999", opacity: 1 },
	callToAction: {position: 'absolute', left: '50%', transform: 'translate(-47%, 0)', top: '15%', color: '#AAAAAA', fontWeight: 300, fontSize: 25, opacity: 1},
	modal: {
		display: 'flex',
		flexDirection: 'column',
	},
	modalTitle: {
		marginRight: 32,
		marginTop: 2,
		fontWeight: 500
	},
	modalOptionsWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: 15,
	},
	modalOptionConfirm: {
		color: '#2DCC70',
		fontSize: 13,
		fontWeight: 600,
		cursor: 'pointer'
	},
	modalOptionCancel: {
		color: '#FF5C54',
		fontSize: 13,
		fontWeight: 600,
		marginRight: 15,
		cursor: 'pointer'
	},
	editInput: {
    width: '100%',
    height: 32,
    marginTop: 16,
    marginBottom: 9,
    borderWidth: 1,
    borderRadius: 2,
    borderStyle: 'solid',
		borderColor: 'gray',
		boxSizing: 'border-box',
		paddingLeft: 10,
		fontSize: 16,
	},
};

export default styles;