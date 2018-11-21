import * as React from 'react';
import { Route, RouteComponentProps, withRouter, Switch } from 'react-router-dom';
import { Stylesheet } from 'declarations';

import { UploadPage, VideosPage } from './pages';
import { Navbar } from './components';

class App extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div style={styles.container}>
        <Navbar location={this.props.location.pathname} />
        <Switch>
          <Route exact path='/' component={UploadPage} />
          <Route path='/videos/:id?' component={VideosPage} />
        </Switch>
      </div>
    );
	}
}

export default withRouter(App);

const styles:Stylesheet = {
  container: {
		alignSelf: 'center',
		marginTop: '10%',
		display: 'flex',
		flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: 748,
  },
}
