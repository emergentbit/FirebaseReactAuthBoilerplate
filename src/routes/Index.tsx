import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from 'firebase';

import Home from './Home';
import Loading from './Loading';

export interface Props {
  // tslint:disable-next-line:no-any
  history: any;
  // tslint:disable-next-line:no-any
  location: any;
  signedInUser?: User;
}

export interface State {
}

const REFFERER = 'REFFERER_KEY';

class Index extends React.Component<Props, State> {

  componentDidMount() {
    if (!this.props.signedInUser) {
      localStorage.setItem(REFFERER, this.props.location.pathname);
      this.props.history.replace({ pathname: '/', state: {from: this.props.location.pathname} });
    } else {
      this.props.history.replace({ pathname: `${localStorage.getItem(REFFERER)}` });
    }
  }

  render() {
    if (this.props.signedInUser) {
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
