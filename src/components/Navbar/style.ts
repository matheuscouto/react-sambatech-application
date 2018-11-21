import { Stylesheet } from "declarations";

const navbarTransitions:Stylesheet = {
	upload: {
		width: 56,
		marginLeft: 1,
	},
	videos: {
		width: 53,
		marginLeft: 67,
	},
}

const styles:Stylesheet = {
	navbar: {
		display: 'flex',
	},
	navbarWrapper: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: 34,
	},
	navbarItem: {
		fontWeight: 500,
		fontSize: 15,
    marginRight: 10,
    textDecoration: 'none',
		transition: "all 0.5s ease-out",
	},
	underlineNavbar: {
		height: 2,
		borderRadius: 3,
		marginTop: 5,
		marginBottom: 12,
		backgroundColor: '#444444',
		transition: "all 0.5s ease-out",
		...navbarTransitions.upload,
	},
};

const navItemTransitions:Stylesheet = {
	default: {
		...styles.navbarItem,
		color: '#AAAAAA',
	},
	selected: {
		...styles.navbarItem,
		color: '#444444'
	}
}

export default styles;
export { navItemTransitions, navbarTransitions };