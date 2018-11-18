import * as React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { Stylesheet } from 'declarations';

import { UploadPage } from './pages';
import { Navbar } from './components';

class App extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div style={styles.container}>
        <Navbar {...this.props} />
				<Route exact path='/' component={UploadPage} />
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
		justifyContent: 'center',
  },
}
