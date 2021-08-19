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
          <a href="https://musicalheart.ru/o-proekte/" className="nav-item">О проекте</a>
          <a href="https://musicalheart.ru/prezident/" className="nav-item">Персоналии</a>
          <a href="https://musicalheart.ru/festival-2021/" className="nav-item">Фестиваль 2021</a>
          <a href="https://musicalheart.ru/category/novosti/" className="nav-item">Новости</a>
          {/* изменены пункты меню */}

        <a href="https://musicalheart.ru/o-proekte/kontakty/" className="nav-item btn btn-primary"><span>Контакты</span></a> 
        {/* изменены текст и ссылка кнопки. надеюсь, валидно... */}
        </nav>
      </header>
    );
  
}
