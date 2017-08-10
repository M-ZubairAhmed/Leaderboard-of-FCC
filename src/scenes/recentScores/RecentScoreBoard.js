import React, { Component } from 'react';
import Loader from '../../components/loader/Loader';
import Row from '../../components/row/Row';
import moment from 'moment';
import RefreshButtonUI from '../../components/refreshButtonUI/RefreshButtonUI';

export default class RecentScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: '',
      loadingStatus: 'initial',
      animatingDataRefreshIcon: false,
      shouldRefreshTimerStart: false
    };
  }

  async componentDidMount() {
    const response = await this.downloadData();
    if (response === 'failed') {
      this.setState({
        loadingStatus: 'failed'
      });
    } else {
      this.setState({
        currentData: response,
        loadingStatus: 'success',
        shouldRefreshTimerStart: true
      });
    }
  }

  async downloadData() {
    let response = 'failed';
    try {
      const request = await fetch(
        'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
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
          {this.state.currentData.map(currentDatum =>
            <Row
              key={currentDatum.username}
              percentileScore={this.percentileCalculation(currentDatum.recent)}
              username={currentDatum.username}
              img={currentDatum.img}
              alltime={currentDatum.alltime}
              recent={currentDatum.recent}
              lastUpdate={this.timeFromNowCalculation(currentDatum.lastUpdate)}
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

  timeFromNowCalculation = lastUpdate => {
    return moment(lastUpdate).fromNow();
  };

  refreshScores = async () => {
    this.setState({
      animatingDataRefreshIcon: true,
      shouldRefreshTimerStart: false
    });
    const latestData = await this.downloadData();
    if (this.state.loadingStatus === 'success' && latestData !== 'failed') {
      const latestData_Stringy = JSON.stringify(latestData);
      const previousJSON_Stringy = JSON.stringify(this.state.currentData);
      if (latestData_Stringy !== previousJSON_Stringy) {
        this.setState({
          currentData: latestData
        });
      }
      this.setState({
        shouldRefreshTimerStart: true
      });
    } else {
      //TODO make a model displaying why it cannot refresh
    }
    this.setState({
      animatingDataRefreshIcon: false
    });
  };

  render() {
    return (
      <div>
        <RefreshButtonUI
          animatingDataRefreshIcon={this.state.animatingDataRefreshIcon}
          onClick={this.refreshScores}
          shouldRefreshTimerStart={this.state.shouldRefreshTimerStart}
        />
        {this.renderIndividualRows()}
        <Loader loadingStatus={this.state.loadingStatus} />
      </div>
    );
  }
}
