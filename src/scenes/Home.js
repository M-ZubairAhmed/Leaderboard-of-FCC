import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import RecentScoreBoard from './recentScores/RecentScoreBoard';
import AllScoreBoard from './alltimeScores/AllScoreBoard';
import Page404 from './page404/Page404';
import './home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="home-root">
        <div className="home-background" />
        <div className="home-backpanel">
          <div className="home-backpanel-nav">
            <NavLink exact to="/" activeClassName="home-link-active">
              <div className="home-backpanel-link">Last Month</div>
            </NavLink>
            <NavLink to="/alltime" activeClassName="home-link-active">
              <div className="home-backpanel-link">All Time</div>
            </NavLink>
          </div>
        </div>
        <div className="home-frontpanel">
          <Switch>
            <Route exact path="/" component={RecentScoreBoard} />
            <Route path="/alltime" component={AllScoreBoard} />
            <Route path="/*" component={Page404} />
          </Switch>
        </div>
      </div>
    );
  }
}
