import React, { Component } from 'react';
import Loader from '../../components/loader/Loader';
import Row from '../../components/row/Row';
import moment from 'moment';

export default class RecentScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: 'initial',
      dataFromNetwork: ''
    };
  }

  async componentDidMount() {
    // console.log('componentDidMount');
    let fetchStatus = 'done';
    let responseJson = '';
    try {
      const response = await fetch(
        'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
      );
      // Check if theres a successfull network call
      if (response.ok) {
        responseJson = await response.json();
        this.setState({
          dataFromNetwork: responseJson
        });
      } else {
        console.log('Server responded with message', response.status);
        fetchStatus = 'failed';
      }
    } catch (e) {
      console.log(e.message);
      fetchStatus = 'failed';
    } finally {
      console.log('Fetching of Data', fetchStatus);
      this.setState({
        loadingStatus: fetchStatus
      });
    }
  }

  renderIndividualRows = () => {
    // console.log('renderIndividualRows');
    if (this.state.loadingStatus === 'done') {
      const data = this.state.dataFromNetwork;
      return (
        <div>
          {data.map(datum =>
            <Row
              key={datum.username}
              percentileScore={this.percentileCalculation(datum.recent)}
              username={datum.username}
              img={datum.img}
              alltime={datum.alltime}
              recent={datum.recent}
              lastUpdate={this.timeFromNowCalculation(datum.lastUpdate)}
            />
          )}
        </div>
      );
    }
  };

  percentileCalculation = score => {
    const highestScore = this.state.dataFromNetwork[0].recent;
    return ~~(score / highestScore * 100);
  };

  timeFromNowCalculation = lastUpdate => {
    return moment(lastUpdate).fromNow();
  };

  render() {
    // console.log('rendering');
    return (
      <div>
        {this.renderIndividualRows()}
        <Loader loadingStatus={this.state.loadingStatus} />
      </div>
    );
  }
}
