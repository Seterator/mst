import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export default function Layout(props) {

    return (
      <div>
        <NavMenu {...props}/>
        <Container>
          {props.children}
        </Container>
      </div>
    )
  
}
