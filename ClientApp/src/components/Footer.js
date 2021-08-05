import React, { Component } from 'react';
import { useState } from 'react';

import '../style/_style.scss'

export function Footer(){

    return(<div className="footer">
    <div className="container">
      <div className="wrapper">
        <a href="index.html" className="logo" className="logo-footer"><img src="img/logo.svg" alt=""/></a>
        <ul>
          <li>Навигация</li>
          <li><a href="page3.html">О нас</a></li>
          <li><a href="festival.html">Фестиваль 2021</a></li>
          <li><a href="staff.html">Персоналии</a></li>
          <li><a href="mediaPage.html">Медиа</a></li>
          <li><a href="news.html">Новости</a></li>
        </ul>
        <ul>
          <li>Документы</li>
          <li><a href="page3.html">Документы организации</a></li>
        </ul>
         <ul>
          <li>Администрация</li>
          <li><a href="#">Авторизироваться</a></li>
        </ul> 
        <ul>
          <li>Контакты</li>
          <li><a href="Tel:+7 495 115 85 30">+7 495 115 85 30</a></li>
          <li><a href="Mailto:manager@musicalheart.ru">manager@musicalheart.ru</a></li>
        </ul>
        <div className="nav-social">
          <a href="https://www.instagram.com/musicalheart.ru/" target="_blank"><img src="img/instagram.svg" alt=""/></a>
          <a href="https://www.facebook.com/musicalheart.ru/" target="_blank"><img src="img/facebook.svg" alt=""/></a>
          <a href="https://vk.com/musicalheartru" target="_blank"><img src="img/vk.svg" alt=""/></a>
          <a href="https://www.youtube.com/channel/UCGKHkwguUZj6GG30hycEw3Q" target="_blank"><img src="img/youtube.svg" alt=""/></a>
        </div>
      </div>
      
      <div className="row">
        <p className="copyright">©2021 Все права защищены</p>
        <p className="title">АНО «Музыкальное Сердце Театра»</p>
      </div>
      
    </div>
   
  </div>)
  
}