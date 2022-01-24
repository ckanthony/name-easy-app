import React, { Component } from 'react'
import App from 'base-shell/lib'
import _config from './config'
import styles from './App.css';
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname);

export default class Application extends Component {
  render() {
    return <App config={_config} />
  }
}
