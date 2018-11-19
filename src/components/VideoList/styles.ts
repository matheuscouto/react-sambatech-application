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
		cursor: 'pointer',
		position: 'relative',
		overflow: 'hidden',
	},
	thumbnailHoover: {
		width: '0',
		height: '100%',
		backgroundColor: 'black',
		opacity: 0.3,
		transition: "all 0.2s ease-out",
		zIndex: 2
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
	}
}

export default styles;