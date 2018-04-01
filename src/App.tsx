import * as React from 'react';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import RouteIndex from './routes/Index';
import { Provider } from 'react-redux';
import ReduxConfig from './config/redux';
import firebase from './config/firebase';
import { User } from 'firebase';

const history = createBrowserHistory();
const reduxConfig = ReduxConfig();

export interface Props {
}

export interface State {
  signedInUser?: User;
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.userStateChange = this.userStateChange.bind(this);

    firebase.auth().onAuthStateChanged(this.userStateChange);
  }

  async componentWillMount() {
    firebase.auth().getRedirectResult()
      // tslint:disable-next-line:no-any
      .then((result: any) => {
        // DO NOTHING! Result will be detected by onAuthStateChanged listener
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(error);
        return null;
      });
  }

  userStateChange(user: User) {
    if (user) {
      // action write user details to redux
      this.setState({signedInUser: user});
    } else {
      // action remove user details from redux
      const provider = new firebase.auth.GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithRedirect(provider);
    }
  }

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
