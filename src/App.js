import React, { Component } from 'react'
import App from 'base-shell/lib'
import _config from './config'
import styles from './App.css';

export default class Application extends Component {
  render() {
    return <App config={_config} />
  }
}
