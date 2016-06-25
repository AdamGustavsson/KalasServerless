import React from 'react';
import { Component } from 'react';

import Error from './shared/error';
import Header from './shared/header';

export default class App extends Component {
  render() {
    return (
        <div>
            <Header />
            <div className="container">
                <Error />
                {this.props.children}
              </div>
      </div>

    );
  }
}
