import React, { Component } from 'react';
import Photo from '../../components/photo/Photo';
import { Progress } from 'semantic-ui-react';

export default class Row extends Component {
  render() {
    return (
      <div>
        <Photo imageUrl={this.props.img} />
        <div>
          {this.props.username}
        </div>
        <div>
          {this.props.alltime}
        </div>
        <div>
          {this.props.recent}
        </div>
        <div>
          {this.props.lastUpdate}
        </div>
        <Progress percent={this.props.percentileScore} size="tiny" />
      </div>
    );
  }
}
