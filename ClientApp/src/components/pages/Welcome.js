import React, { Component, useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { UserContext } from "../../LoginMiddleware";

import { Footer } from "../Footer";

export function WelcomePage(props) {
  const h = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    let clList = document.getElementById("notWelcome").classList;
    if (!clList.contains("visibility-hidden")) {
      clList.toggle("visibility-hidden");
    }
  }, []);

  function handleClick() {
    h.push("/profileView");
    let clList = document.getElementById("notWelcome").classList;
    if (clList.contains("visibility-hidden")) {
      clList.remove("visibility-hidden");
    }

    if (user.email == "manager@musicalheart.ru") {
      let clList = document.getElementById("admin-panel").classList;
      if (clList.contains("visibility-hidden")) {
        clList.remove("visibility-hidden");
      }
    }
  }
  return (
    <div>
      <Container>
        <div className="welcome">
          <h1>Уважаемые академики!</h1>
          <h2>
            Рады приветствовать вас на официальной странице голосования премии
            «Музыкальное сердце театра»-2021!
          </h2>
          <div className="welcome-content">
            Благодарим вас за вступление в Академию музыкального театра, мы
            уверены, вклад каждого из вас в развитие музыкального театра в
            России поспособствует достижению целей Академии.
            {<br/>}{<br/>}Миссия Академии базируется на создании направления и импульса для
            развития российского музыкального театра, выведения процесса
            создания постановок и самих музыкальных спектаклей на качественно
            новый уровень.
            {<br/>}{<br/>}Начиная с этого года лауреатов премии определяют члены Академии. В
            состав Академии на сегодня вошли более 100 выдающихся деятелей и
            профессионалов, работающих в сфере музыкального театра.
            {<br/>}{<br/>}В этом году номинантами премии стали 14
            спектаклей, отобранных экспертным советом. Мы предлагаем каждому
            Академику высказать собственное мнение по спектаклям и определить
            своего лауреата. По итогам голосования будут подведены итоги и
            определены лауреаты премии «Музыкальное сердце театра»-2021.
          </div>
          <div>
            <button onClick={handleClick}>Продолжить</button>
          </div>
        </div>
      </Container>
    </div>
  );
}
