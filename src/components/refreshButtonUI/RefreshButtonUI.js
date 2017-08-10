import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

let intervalID = '';
let startTime = moment().toISOString();

export default class RefreshButtonUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedRefreshTime: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldRefreshTimerStart === true) {
      intervalID = setInterval(() => this.startElapsedRefreshTime(), 30000);
    }
  }

  startElapsedRefreshTime = () => {
    const elapsedRefreshTime = moment(startTime).fromNow();
    this.setState({
      elapsedRefreshTime: elapsedRefreshTime
    });
  };

  resetElapsedRefreshTime = () => {
    clearInterval(intervalID);
    startTime = moment().toISOString();
    this.props.onClick();
  };

  render() {
    return (
      <div onClick={this.resetElapsedRefreshTime}>
        <Icon loading={this.props.loading} name="repeat" link />
        <div>
          {this.props.lastUpdated}
        </div>
        <div>
          {this.state.elapsedRefreshTime}
        </div>
      </div>
    );
  }
}
