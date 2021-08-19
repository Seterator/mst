import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Footer } from './Footer';
import { NavMenu } from './NavMenu';

export default function Layout(props) {

    return (
      <div style={{display:`${props.display ? 'none':'block'}`}}>
        <NavMenu {...props}/>
        <div>
          {props.children}
        </div>
        <Footer/>
      </div>
    )
  
}
