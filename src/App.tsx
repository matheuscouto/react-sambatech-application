import * as React from 'react';

import { Route } from 'react-router-dom';

// Pages

import { Stylesheet } from 'declarations';

class App extends React.Component {
  public render() {
    return (
      <div style={styles.container}>
      </div>
    );
  }
}

export default App;

const styles:Stylesheet = {
  container: {
		width: '100%',
		height: '100%',
		display: 'flex',
  }
};