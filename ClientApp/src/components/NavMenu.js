import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link , useHistory} from 'react-router-dom';
import './NavMenu.css';

export function NavMenu(props) {
 
const [collapsed, setCollapsed] = useState(true);
const h = useHistory();
function redirect(p){
  h.push(p);
}

  function toggleNavbar () {
    setCollapsed(!collapsed)
  }


    return (
      <div className="container" style={{maxWidth:'1230px'}}>

      <header className="notWelcome border-bottom" id="notWelcome">
        <Navbar className="height-max navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3" light>
          <Container>
            
            <NavbarToggler onClick={()=>toggleNavbar()} className="mr-2" />
            <div className="flex-sm-row-reverse bottom-header" isOpen={!collapsed} navbar>
              <div className="bottom-header-left-part">
              <ul className="navbar-nav flex-grow">
                <NavItem className="bottom-navbar-item ">
                  <Link className="bottom-navbar-item" to='/profileView'>Профиль<img className="hover-img" src={require('../img/Polygon2.svg')} alt=""/></Link>
                </NavItem>
                <NavItem className="bottom-navbar-item">
                  <Link className="bottom-navbar-item" to='/estimation'>Оценка работ<img className="hover-img" src={require('../img/Polygon2.svg')} alt=""/></Link>
                </NavItem>
                <NavItem className="bottom-navbar-item">
                  <Link className="bottom-navbar-item" onClick={()=>redirect('/history')}>Ваши оценки<img className="hover-img" src={require('../img/Polygon2.svg')} alt=""/></Link>
                </NavItem>
              </ul>

              </div>
              <div className="bottom-header-right-part">
              <ul className="navbar-nav flex-grow">
              <NavItem className="bottom-navbar-item">
                  <Link className="bottom-navbar-item visibility-hidden" id="admin-panel" onClick={()=>redirect('/admin')}>Админка<img className="hover-img" src={require('../img/Polygon2.svg')} alt=""/></Link>
                </NavItem>
                <NavItem className="bottom-navbar-item">
                  <Link className="bottom-navbar-item" onClick={()=>redirect('/profileEdit')}>Изменение данных<img className="hover-img" src={require('../img/Polygon2.svg')} alt=""/></Link>
                </NavItem>
                <NavItem className="bottom-navbar-item">
                <Link className="bottom-navbar-item" onClick={()=>props.logout()}>Выйти<img className="hover-img" src={require('../img/Polygon2.svg')} alt=""/></Link>
                </NavItem>
              </ul>

              </div>
              
            </div>
          </Container>
        </Navbar>
      </header>
      </div>
    );
  
}
