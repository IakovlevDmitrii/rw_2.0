import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorIndicator from '../error-indicator';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: '' };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: `${errorInfo}` });
    // eslint-disable-next-line no-console
    console.log(`[ERROR_BOUNDARY] error ${error.toLocaleString()}`);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorIndicator errorMessage={hasError} />;
    }

    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
