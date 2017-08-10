import React, { Component } from 'react';
import Loader from '../../components/loader/Loader';
import Row from '../../components/row/Row';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

export default class RecentScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: 'initial',
      dataFromNetwork: '',
      refreshProgress: false
    };
    // this.refreshScores = this.refreshScores.bind(this);
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

  async downloadJSON() {
    let fetchStatus = 'done';
    let responseJson = '';
    try {
      const response = await fetch(
        'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
      );
      // Check if theres a successfull network call
      if (response.ok) {
        responseJson = await response.json();
        // this.setState({
        //   dataFromNetwork: responseJson
        // });
        return await responseJson;
      } else {
        console.log('Server responded with message', response.status);
        fetchStatus = 'failed';
      }
    } catch (e) {
      console.log(e.message);
      fetchStatus = 'failed';
      return await fetchStatus;
    } finally {
      console.log('Fetching of Data', fetchStatus);
      // this.setState({
      //   loadingStatus: fetchStatus
      // });
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

  refreshScores = async () => {
    this.setState({
      refreshProgress: true
    });
    const updatedJSON = await this.downloadJSON();
    if (
      this.state.dataFromNetwork !== '' &&
      this.state.loadingStatus === 'done' &&
      updatedJSON !== 'failed'
    ) {
      const updatedJSON_Stringi = JSON.stringify(updatedJSON);
      const previousJSON_Stringi = JSON.stringify(this.state.dataFromNetwork);
      if (updatedJSON_Stringi === previousJSON_Stringi) {
        console.log('no change');
      }
    } else {
      console.log('error');
    }
    this.setState({
      refreshProgress: false
    });
  };

  render() {
    // console.log('rendering');
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
