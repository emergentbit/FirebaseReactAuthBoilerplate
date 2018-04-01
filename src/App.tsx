import * as React from 'react';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import RouteIndex from './routes/Index';
import { Provider } from 'react-redux';
import ReduxConfig from './config/redux';

const history = createBrowserHistory();
const reduxConfig = ReduxConfig();

export interface Props {
}

export interface State {
}

class App extends React.Component<Props, State> {

  render() {
    return (
      <Provider store={reduxConfig}>
        <Router history={history}>
          <RouteIndex {...this.state} />
        </Router>
      </Provider>
    );
  }
}

export default App;
