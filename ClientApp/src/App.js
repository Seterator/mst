import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Counter } from './components/Counter';
import { Footer } from './components/Footer';
import { WelcomePage } from './components/pages/Welcome'
import { EstimationWork } from './components/pages/estimation/EstimationWork'
import { EstimationBase } from './components/pages/estimation/EstimationBase'
import { ProfileView } from './components/pages/profile/ProfileView'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={WelcomePage} />
        <Route path='/admin' component={Counter} />
        <Route path='/work' component={EstimationWork} />
        <Route path='/estimation' component={EstimationBase} />
        <Route path='/profileView' component={ProfileView} />
      </Layout>
    );
  }
}
