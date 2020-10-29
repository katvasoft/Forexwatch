import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authorizer extends Component {


    componentWillMount() {
      if (!this.props.auth.authenticated) {
        this.props.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth.authenticated) {
        this.props.router.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }


  function mapStateToProps(state) {


    return {

      auth: state.authStatus
    };
  }

  return connect(mapStateToProps)(Authorizer);
}
