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
    let fetchStatus = 'done';
    let responseJson = '';
    try {
      const response = await fetch(
        'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
      );
      // Check if theres a successfull network call
      if (response.ok) {
        responseJson = await response.json();
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
        loadingStatus: fetchStatus,
        dataFromNetwork: responseJson
      });
    }
  }

  renderIndividualRows = () => {
    let row = '';
    if (this.state.loadingStatus === 'done') {
      const data = this.state.dataFromNetwork;
      row = data.map(datum =>
        <Row
          key={datum.username}
          username={datum.username}
          img={datum.img}
          alltime={datum.alltime}
          recent={datum.recent}
          lastUpdate={datum.lastUpdate}
        />
      );
      return (
        <div>
          {row}
        </div>
      );
    }
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
