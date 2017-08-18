import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './loader.css';

export default class Loader extends Component {
  render() {
    if (this.props.loadingStatus === 'initial') {
      return <div className="loader-anim" />;
    } else if (this.props.loadingStatus === 'failed') {
      return (
        <div className="loader-error-root">
          <div className="loader-error-title">Error!</div>
          <div className="loader-error-moto">
            We kept trying to call the page but nothing came back<br />
            Either servers are down or theres problem with Internet connection
          </div>
          <Icon
            className="loader-error-ico"
            name="pied piper alternate"
            size="massive"
            color="black"
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

Loader.propTypes = {
  loadingStatus: PropTypes.oneOf(['initial', 'failed', 'success']).isRequired
};
