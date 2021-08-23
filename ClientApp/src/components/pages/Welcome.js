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
            Мы рады приветствовать вас на официальной странице голосования премии. 
          </h2>
          <div className="welcome-content">
            Еще раз благодарим вас за вступление в Академию современного музыкального театра. Уверены, что непосредственное участие каждого из вас в работе института премии будет способствовать достижению целей Академии.
            {<br/>}{<br/>}Наша с вами миссия заключается в формировании импульса развития современного российского музыкального театра, выведения процесса создания постановок и качества музыкальных спектаклей на безупречный новый уровень. 
            {<br/>}{<br/>}Как вы уже знаете, начиная с этого года лауреатов премии определяют члены Академии, в составе которой более 100 выдающихся деятелей и профессионалов, работающих в сфере музыкального театра (активная ссылка – Персоналии/Академики).
            {<br/>}{<br/>}В этом году в шорт-лист премии вошли 14 спектаклей и 71 персональный номинант, отобранных экспертным советом из 84 заявленных работ (активная ссылка – Персоналии/Экспертный совет). Мы предоставляем возможность каждому члену Академии сделать свой личный выбор и отдать голос за лучших кандидатов на получение премии в конкурсных номинациях.
            {<br/>}{<br/>}По итогам вашего голосования решением большинства голосов будут определены лауреаты премии «Музыкальное сердце театра» - 2021. О вынесенном вами решении все узнают 11 октября 2021 года на Церемонии вручения премии «Музыкальное сердце театра» в Новосибирском Театре Оперы и Балета (НОВАТ).
          </div>
          <div> 
            <button onClick={handleClick}>Продолжить</button>
          </div>
        </div>
      </Container>
    </div>
  );
}
