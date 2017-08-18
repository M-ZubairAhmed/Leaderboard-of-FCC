import React, { Component } from 'react';
import './photo.css';

export default class Photo extends Component {
  render() {
    return (
      <img
        src={this.props.imageUrl}
        alt="profile of an fcc users"
        className="profilePhoto"
      />
    );
  }
}
