import React, { Component } from 'react';

export default class RecentScoreBoard extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let fetchStatus = 'Complete';
    try {
      const response = await fetch(
        'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
      );
      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);
      } else {
        console.log('Server responded with message', response.status);
        fetchStatus = 'Incomplete';
      }
    } catch (e) {
      console.log(e.message);
      fetchStatus = 'Incomplete';
    } finally {
      console.log('Fetching of Data', fetchStatus);
    }
  }

  render() {
    return <div>MyComponent</div>;
  }
}
