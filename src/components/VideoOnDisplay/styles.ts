import { Stylesheet } from '../../../declarations';

const styles:Stylesheet = {
	videoOnDisplay: {
		maxWidth: '100%',
		maxHeight: 'calc(748px*9/16)',
		height: 0,
		marginBottom: 0,
		borderRadius: 4,
		boxShadow: '0px 18px 55px -12px rgba(0,0,0,0.45)',
		transition: "all 0.4s ease-out",
		overflow: 'hidden',
		backgroundColor: 'black',
		display: 'flex',
		justifyContent: 'center',
		position: 'relative',
	},
}

export default styles;