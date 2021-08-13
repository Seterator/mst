import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export function MainNavMenu(props) {
 
const [collapsed, setCollapsed] = useState(true);

  function toggleNavbar () {
    setCollapsed(!collapsed)
  }


    return (
        <header className="header">
        <a className="logo-header"><img src={require("../img/logo.svg")} alt=""/></a>
        <nav className="nav-header">
          <a href="http://musicalheart.ru" className="nav-item">Главная</a>
          <a className="nav-item">О нас</a>
          <a className="nav-item">Фестиваль 2021</a>
          <a className="nav-item">Персоналии</a>
          <a className="nav-item">Медиа</a>
          <a className="nav-item">Новости</a>
        <a className="nav-item btn btn-primary"><span>Билеты</span></a> 
        </nav>
      </header>
    );
  
}
