import React, { Component } from 'react';
import Photo from './components/photo/Photo';
import NormalText from './components/normalText/NormalText';
import RecentScoreBoard from './scenes/recentScores/RecentScoreBoard';

export default class Test extends Component {
  render() {
    return (
      <div>
        <div>
          <i>Photo component</i>
          <Photo imageUrl="https://goo.gl/6qpk6j" />
        </div>
        <div>
          <NormalText text="NormalText :Sherlock Holmes" />
        </div>
        <div>
          <RecentScoreBoard />
        </div>
      </div>
    );
  }
}
