import React, { Component } from 'react';
import Loader from '../../components/loader/Loader';
import Row from '../../components/row/Row';

export default class AllScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: '',
      loadingStatus: 'initial'
    };
  }

  async componentDidMount() {
    console.log('AlltimeScores', 'componentDidMount');
    const response = await this.downloadData();
    this.updateData(response);
  }

  updateData = response => {
    if (response === 'failed') {
      this.setState({
        loadingStatus: 'failed'
      });
    } else {
      this.setState({
        currentData: response,
        loadingStatus: 'success'
      });
    }
    console.log(('updateData', this.state.currentData));
  };

  async downloadData() {
    let response = 'failed';
    try {
      const request = await fetch(
        'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
      );
      if (request.ok) {
        response = await request.json();
      } else {
        console.log('Server responded with message :-', request.status);
      }
    } catch (e) {
      console.log('Error while requesting for JSON :-', e.message);
    } finally {
      return response;
    }
  }

  renderIndividualRows = () => {
    if (
      this.state.loadingStatus === 'success' &&
      this.state.currentData !== ''
    ) {
      return (
        <div>
          {this.state.currentData.map((currentDatum, index) =>
            <Row
              position={index + 1}
              key={currentDatum.username}
              percentileScore={this.percentileCalculation(currentDatum.recent)}
              username={currentDatum.username}
              img={currentDatum.img}
              score={currentDatum.alltime}
            />
          )}
        </div>
      );
    }
  };

  percentileCalculation = score => {
    const highestScore = this.state.currentData[0].recent;
    return ~~(score / highestScore * 100);
  };

  render() {
    return (
      <div>
        {this.renderIndividualRows()}
        <Loader loadingStatus={this.state.loadingStatus} />
      </div>
    );
  }
}
