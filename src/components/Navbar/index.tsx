import * as React from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import styles, { navItemTransitions, navbarTransitions } from './style';

import { Stylesheet } from 'declarations';

interface IState {
  underlineNavbar: React.CSSProperties,
  navItemStyles: Stylesheet,
}

class Navbar extends React.Component<RouteComponentProps, IState> {
  public state:IState = {
		underlineNavbar: styles.underlineNavbar,
		navItemStyles: {
			upload: navItemTransitions.default,
			videos: navItemTransitions.default,
		},
  }

  public render() {
    const { underlineNavbar, navItemStyles } = this.state;
    return (
      <div style={styles.navbarWrapper}>
        <div style={styles.navbar}>
          <NavItem style={navItemStyles.upload} to="/">UPLOAD</NavItem>
          <NavItem style={navItemStyles.videos} to="/videos">VIDEOS</NavItem>
        </div>
        <div style={underlineNavbar} />
      </div>
    );
  }

	public componentDidMount() {
    let currentSession = this.props.location.pathname.replace('/','')
    if(currentSession === '') {currentSession = 'upload'} 
		this.setState((state) => ({
			...state,
			navItemStyles: {
				...state.navItemStyles,
				[currentSession]: navItemTransitions.selected
      },
      underlineNavbar: {
        ...state.underlineNavbar,
				...navbarTransitions[currentSession]
      }
    }))
  }

  public componentDidUpdate(oldProps: RouteComponentProps ) {
    if(this.props.location.pathname !== oldProps.location.pathname) {

      let currentSession = this.props.location.pathname.replace('/','')
      if(currentSession === '') {currentSession = 'upload'} 
      let previousSession = oldProps.location.pathname.replace('/','')
      if(previousSession === '') {previousSession = 'upload'} 

      this.setState((state) => ({
        ...state,
        navItemStyles: {
          ...state.navItemStyles,
          [currentSession]: navItemTransitions.selected,
          [previousSession]: navItemTransitions.default,
        },
        underlineNavbar: {
          ...state.underlineNavbar,
          ...navbarTransitions[currentSession]
        }
      }))
    }
  }
}

interface INavItemProps {
  children: React.ReactNode,
  style: React.CSSProperties,
  onClick?: () => void,
  to: string

}
const NavItem:React.FunctionComponent<INavItemProps> = ({
  children,
  onClick,
  style,
  to
}) => <Link to={to} onClick={onClick} style={style}>{children}</Link>

export default Navbar;
