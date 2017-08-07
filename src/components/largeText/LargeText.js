import React, { Component } from 'react';

export default class LargeText extends Component {
  render() {
    return (
      <h4>
        {this.props.text}
      </h4>
    );
  }
}
