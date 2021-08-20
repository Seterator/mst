import React, { Component } from 'react';
import { useState } from 'react';

import '../style/_style.scss'

export function Footer(){

    return(<div className="footer">
    <div style={{width:'100%', padding:'60px 345px', display:'grid'}}>
      <div className="wrapper">
        <a className="logo logo-footer"><img src={require("../img/logo.svg")} alt=""/></a>
        <ul style={{marginRight: '281px'}}>
          <li>Навигация</li>
          <li><a href="https://musicalheart.ru/">Главная</a></li>
          <li><a href="https://musicalheart.ru/o-proekte/">О проекте</a></li>
          <li><a href="https://musicalheart.ru/prezident/">Персоналии</a></li>
          <li><a href="https://musicalheart.ru/festival-2021/">Фестиваль 2021</a></li>
          <li><a href="https://musicalheart.ru/category/novosti/">Новости</a></li>
        </ul>
        {/* изменены пункты меню */}
        <ul style={{marginRight: '179px'}}>
          <li>Документы</li>
          <li><a href="https://musicalheart.ru/o-proekte/dokumenty/">Документы организации</a></li>
          {/* изменён пункт меню */}
        </ul>
        <div>
         <ul>
          <li>Авторизация жюри</li>
          <li><a href="http://golos.musicalheart.ru/">Авторизироваться</a></li>
          {/* изменён пункт меню */}
        </ul> 
        <ul>
          <li>Контакты</li>
          <li><a href="Tel:+7 495 115 85 30">+7 495 115 85 30</a></li>
          <li><a href="Mailto:manager@musicalheart.ru">manager@musicalheart.ru</a></li>
        </ul>
        
        <div className="nav-social">
          <a href="https://www.instagram.com/musicalheart.ru/" target="_blank"><img src={require("../img/instagram.svg")} alt=""/></a>
          <a href="https://www.facebook.com/musicalheart.ru/" target="_blank"><img src={require("../img/facebook.svg")} alt=""/></a>
          <a href="https://vk.com/musicalheartru" target="_blank"><img src={require("../img/vk.svg")} alt=""/></a>
          <a href="https://www.youtube.com/channel/UCGKHkwguUZj6GG30hycEw3Q" target="_blank"><img src={require("../img/youtube.svg")} alt=""/></a>
        </div>
        </div>
      </div>
      
      <div className="row"  style={{marginTop: '120px'}}>
        <p className="copyright">©2021 Все права защищены</p>
        <p className="title">АНО «Музыкальное Сердце Театра»</p>
      </div>
      
    </div>
   
  </div>)
  
}