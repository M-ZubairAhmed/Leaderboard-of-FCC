import React, { Component } from 'react';
import Photo from '../../components/photo/Photo';
import { Progress } from 'semantic-ui-react';
import './row.css';

export default class Row extends Component {
  render() {
    return (
      <div className="row-root">
        <div className="row-img">
          <Photo imageUrl={this.props.img} />
        </div>
        <div className="row-pos">
          {this.props.position} .
        </div>
        <div className="row-name">
          {this.props.username}
        </div>
        <div className="row-scr">
          {this.props.score} points
        </div>
        {/* <div className="row-upd">
          {this.props.lastUpdate}
        </div> */}
        <div className="row-prg">
          <Progress percent={this.props.percentileScore} size="tiny" />
        </div>
      </div>
    );
  }
}
