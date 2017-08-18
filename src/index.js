import React from 'react';
import ReactDOM from 'react-dom';
import Home from './scenes/Home';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Home />
  </Router>,
  document.getElementById('root')
);
