import React, { Component } from 'react';
import './style/base.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

