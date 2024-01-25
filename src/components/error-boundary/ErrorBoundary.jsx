import React, {Component} from "react";
import PropTypes from "prop-types";
import ErrorIndicator from "../error-indicator";

export default class ErrorBoundary extends Component {
  state= { // eslint-disable-line
    hasError: '',
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: `${errorInfo}` });
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
