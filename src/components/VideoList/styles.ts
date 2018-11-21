import { Stylesheet } from '../../../declarations';

const styles:Stylesheet = {
	videoList: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	videoItemWrapper: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 20,
		marginRight: 20,
	},
	thumbnail: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: 231,
		height: 137.8,
		borderRadius: 3,
		backgroundColor: 'rgb(190, 190, 190)',
		boxShadow: '0px 18px 55px -12px rgba(0,0,0,0.35)',
		marginBottom: 20,
		position: 'relative',
		overflow: 'hidden',
	},
	thumbnailHoover: {
		width: '0',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.3)',
		opacity: 0,
		transition: "all 0.2s ease-out",
		zIndex: 2,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		cursor: 'arrow',
	},
	thumbnailHooverIcons: {
		cursor: 'pointer',
	},
	title: {
		fontSize: 15,
		fontWeight: 'lighter'
	},
	encoding: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: '50%',
		top: '50%',
		margin: 'auto',
		transform: 'translate(-50%, -50%)',
	},
	encodingLabel: {
		fontWeight: 'lighter',
    marginBottom: 5,
    marginRight: 7,
    color: 'rgb(68, 68, 68)'
	},
	thumbnailImage: {
		position: 'absolute',
		width: '100%',
		height: 'auto',
		cursor: 'pointer',
	},
	modal: {
		display: 'flex',
		flexDirection: 'column',
	},
	modalTitle: {
		marginRight: 32,
		marginTop: 2
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
		fontSize: 14,
	},
	videoListWrapper: {
		display: 'flex',
		flexDirection: 'column',
	},
	paginationButtonsWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginBottom: 20,
		alignItems: 'center',
	},
	paginationButton: {
		marginRight: 20,
		cursor: 'pointer',
	},
	paginationButtonsPage: {
		fontSize: 12,
    marginRight: 20,
	}
}

export default styles;