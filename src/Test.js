import React, { Component } from 'react';
import Photo from './components/photo/Photo';
import LargeText from './components/largeText/LargeText';

export default class Test extends Component {
  render() {
    return (
      <div>
        <div>
          <i>Photo component</i>
          <Photo imageUrl="https://goo.gl/6qpk6j" />
        </div>
        <div>
          <LargeText text="LargeText : Sherlock Holmes" />
        </div>
      </div>
    );
  }
}
