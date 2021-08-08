import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import  Layout  from './components/Layout';
import { Counter } from './components/Counter';
import { Admin } from './components/pages/Admin';
import { WelcomePage } from './components/pages/Welcome'
import { EstimationWork } from './components/pages/estimation/EstimationWork'
import { EstimationBase } from './components/pages/estimation/EstimationBase'
import { ProfileView } from './components/pages/profile/ProfileView'
import { ProfileEdit } from './components/pages/profile/ProfileEdit'

import './custom.css'
import './../src/style/index.scss'

export default function App(props) {

  const NotFoundRedirect = () => <Redirect to='/' />
    return (
      <Layout {...props}>
        <Route exact path='/' component={WelcomePage} />
        <Route path='/admin' component={Admin} />
        <Route path='/work/:id' component={EstimationWork} />
        <Route path='/estimation' component={EstimationBase} />
        <Route path='/profileView' component={ProfileView} />
        <Route path='/profileEdit' component={ProfileEdit} />
        <Route component={NotFoundRedirect} />
      </Layout>
    );
  
}
