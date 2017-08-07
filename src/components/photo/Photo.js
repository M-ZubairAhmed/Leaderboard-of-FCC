import React, { Component } from 'react';
import './photo.css';

export default class Photo extends Component {
  render() {
    return (
      <div>
        <img
          src={this.props.imageUrl}
          alt="profile of fcc users"
          className="profilePhoto"
        />
      </div>
    );
  }
}
