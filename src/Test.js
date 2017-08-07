import React, { Component } from 'react';
import Photo from './components/photo/Photo';

export default class Test extends Component {
  render() {
    return (
      <div>
        <div>
          <h4>Photo component</h4>
          <Photo imageUrl="https://goo.gl/6qpk6j" />
        </div>
      </div>
    );
  }
}
