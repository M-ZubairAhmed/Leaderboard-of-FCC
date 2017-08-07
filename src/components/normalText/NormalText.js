import React, { Component } from 'react';

export default class NormalText extends Component {
  render() {
    return (
      <h4>
        {this.props.text}
      </h4>
    );
  }
}
