import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Counter } from './components/Counter';
import { Footer } from './components/Footer';
import { WelcomePage } from './components/pages/Welcome'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route path='/' component={WelcomePage} />
        <Route path='/admin' component={Counter} />
        <Footer/>
      </Layout>
    );
  }
}
