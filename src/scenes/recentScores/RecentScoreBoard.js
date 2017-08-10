import React, { Component } from 'react';
import Loader from '../../components/loader/Loader';
import Row from '../../components/row/Row';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

export default class RecentScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: '',
      loadingStatus: 'initial',
      refreshProgress: false
    };
    // this.refreshScores = this.refreshScores.bind(this);
  }

  async componentDidMount() {
    const response = await this.downloadData();
    if (response === 'failed') {
      console.log('aaaa failed');
      this.setState({
        loadingStatus: 'failed'
      });
    } else {
      this.setState({
        currentData: response,
        loadingStatus: 'success'
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
      refreshProgress: true
    });
    const latestData = await this.downloadData();
    if (this.state.loadingStatus === 'success' && latestData !== 'failed') {
      const latestData_Stringy = JSON.stringify(latestData);
      const previousJSON_Stringy = JSON.stringify(this.state.currentData);
      if (latestData_Stringy === previousJSON_Stringy) {
        console.log('data is upto date'); //TODO
      } else {
        this.setState({
          currentData: latestData
        });
      }
    } else {
      console.log('Request to update failed !'); //TODO
    }
    this.setState({
      refreshProgress: false
    });
  };

  render() {
    console.log('rendering');
    return (
      <div>
        <Icon
          loading={this.state.refreshProgress}
          name="repeat"
          onClick={this.refreshScores}
          link
        />
        {this.renderIndividualRows()}
        <Loader loadingStatus={this.state.loadingStatus} />
      </div>
    );
  }
}
