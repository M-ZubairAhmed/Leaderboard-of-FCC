import React, { Component } from 'react';
import './loader.css';
import PropTypes from 'prop-types';

export default class Loader extends Component {
  render() {
    if (this.props.loadingStatus === 'initial') {
      return <div className="loader" />;
    } else if (this.props.loadingStatus === 'failed') {
      return <div>Failed</div>;
    } else {
      return <div />;
    }
  }
}

Loader.propTypes = {
  loadingStatus: PropTypes.oneOf(['initial', 'failed', 'success']).isRequired
};
