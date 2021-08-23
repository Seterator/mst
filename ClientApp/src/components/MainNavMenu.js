import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export function MainNavMenu(props) {
 
const [collapsed, setCollapsed] = useState(true);

  function toggleNavbar () {
    setCollapsed(!collapsed)
  }

  function newPage (url) {
    window.open(url,"_blank");
  }

    return (
        <header className="header">
        <a className="logo-header"><img src={require("../img/logo.svg")} alt=""/></a>
        <nav className="nav-header">
          <a onClick={()=>newPage("http://musicalheart.ru")} className="nav-item">Главная</a>
          <a onClick={()=>newPage("https://musicalheart.ru/o-proekte/")} className="nav-item">О проекте</a>
          <a onClick={()=>newPage("https://musicalheart.ru/prezident/")} className="nav-item">Персоналии</a>
          <a onClick={()=>newPage("https://musicalheart.ru/festival-2021/")} className="nav-item">Фестиваль 2021</a>
          <a onClick={()=>newPage("https://musicalheart.ru/category/novosti/")} className="nav-item">Новости</a>

        <a onClick={()=>newPage("https://musicalheart.ru/o-proekte/kontakty/")} className="nav-item btn btn-primary" style={{border: 'none'}}><span>Контакты</span></a> 
        </nav>
      </header>
    );
  
}
