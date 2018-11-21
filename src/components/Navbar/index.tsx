import * as React from 'react';

import { Link } from 'react-router-dom';
import styles, { navItemTransitions, navbarTransitions } from './style';

import { Stylesheet } from 'declarations';

interface IState {
  underlineNavbar: React.CSSProperties,
  navItemStyles: Stylesheet,
}

class Navbar extends React.Component<{location: string}, IState> {
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
          <Link style={navItemStyles.upload} to="/">UPLOAD</Link>
          <Link style={navItemStyles.videos} to="/videos">VIDEOS</Link>
        </div>
        <div style={underlineNavbar} />
      </div>
    );
  }

	public componentDidMount() {
    let currentSession = this.props.location.replace('/','').split('/')[0]
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

  public componentDidUpdate(oldProps: { location: string } ) {
    let currentSession = this.props.location.replace('/','').split('/')[0]
    if(currentSession === '') {currentSession = 'upload'} 
    let previousSession = oldProps.location.replace('/','').split('/')[0]
    if(previousSession === '') {previousSession = 'upload'} 

    if(currentSession !== previousSession) {
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

export default Navbar;
