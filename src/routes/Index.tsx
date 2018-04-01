import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from 'firebase';

import Home from './Home';
import Loading from './Loading';
import firebase from '../config/firebase';

export interface Props {
  // tslint:disable-next-line:no-any
  history: any;
  // tslint:disable-next-line:no-any
  location: any;
}

export interface State {
  signedInUser: User | null;
}

const REFFERER = 'REFFERER_KEY';

class Index extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      signedInUser: null
    };

    this.userStateChange = this.userStateChange.bind(this);

    const currentReffererPath = localStorage.getItem(REFFERER);
    if (!currentReffererPath) {
      localStorage.setItem(REFFERER, this.props.location.pathname);
    } else {
      // tslint:disable-next-line:no-console
      console.log(currentReffererPath);
    }

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
    // tslint:disable-next-line:no-console
    console.log(user);
    if (user) {
      // action write user details to redux
      this.setState({signedInUser: user});
      const redirectToPath = localStorage.getItem(REFFERER);
      localStorage.removeItem(REFFERER);
      // tslint:disable-next-line:no-console
      console.log(redirectToPath);
      this.props.history.replace({ pathname: `${redirectToPath}` });
    } else {
      // action remove user details from redux
      const provider = new firebase.auth.GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().signInWithRedirect(provider);
    }
  }

  render() {
    if (this.state.signedInUser) {
      return (
        <>
          <Route exact={true} path={'/'} component={Home} />
          {/* Add more routes here */}
        </>
      );
    } else {
      return (<Route path={'/'} component={Loading} />);
    }
  }
}

// tslint:disable-next-line:no-any
export function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
  };
}

export default withRouter(connect(mapStateToProps)(Index));
