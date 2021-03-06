import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import  Layout  from './components/Layout';
import { Admin } from './components/pages/Admin';
import { WelcomePage } from './components/pages/Welcome'
import { EstimationWork } from './components/pages/work/EstimationWork'
import { EstimationBase } from './components/pages/work/EstimationBase'
import EstimationHistory from './components/pages/work/EstimationHistory'
import { ProfileView } from './components/pages/work/ProfileView'
import { ProfileEdit } from './components/pages/work/ProfileEdit'
import LoginSN from './LoginSN';

import './custom.css'
import './../src/style/index.scss'


export default function App(props) {

  
    return (
      <Layout {...props}>
        <Route exact path='/' component={WelcomePage} />
        <Route path='/admin' component={Admin} />
        <Route path='/work/:id' component={EstimationWork} />
        <Route path='/estimation' component={EstimationBase} />
        <Route path='/profileView' component={ProfileView} />
        <Route path='/profileEdit' component={ProfileEdit} />
        <Route path='/history' component={EstimationHistory} />
        
        
      </Layout>
    );
  
}
