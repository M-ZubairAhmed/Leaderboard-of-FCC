import React, { Component } from 'react';
import './home.css';
import RecentScoreBoard from './recentScores/RecentScoreBoard';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-root">
        <div className="home-background" />
        <div className="home-backpanel" />
        <div className="home-frontpanel">
          <RecentScoreBoard />
        </div>
      </div>
    );
  }
}
