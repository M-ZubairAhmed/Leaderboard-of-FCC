import React, { Component } from 'react';
import Loader from '../../components/loader/Loader';
import Row from '../../components/row/Row';

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
              lastUpdate={datum.lastUpdate}
            />
          )}
        </div>
      );
      // row = data.map(datum =>
      //   <Row
      //     key={datum.username}
      //     username={datum.username}
      //     img={datum.img}
      //     alltime={datum.alltime}
      //     recent={datum.recent}
      //     lastUpdate={datum.lastUpdate}
      //   />
      // );
      // return (
      //   <div>
      //     {row}
      //   </div>
      // );
    }
  };

  percentileCalculation = score => {
    const highestScore = this.state.dataFromNetwork[0].recent;
    return ~~(score / highestScore * 100);
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
