import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import  Layout  from './components/Layout';
import { Admin } from './components/pages/Admin';
import { WelcomePage } from './components/pages/Welcome'
import { EstimationWork } from './components/pages/work/EstimationWork'
import { EstimationBase } from './components/pages/work/EstimationBase'
import { ProfileView } from './components/pages/work/ProfileView'
import { ProfileEdit } from './components/pages/work/ProfileEdit'

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
        
      </Layout>
    );
  
}
