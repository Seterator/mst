import React, { Component } from 'react';
import { useState } from 'react';

export function Footer(){
    return (
        <div className="footer">
            <div>
            <div style={{width: '30%',
height: '100%',
float: 'left'}}></div>
        <div className="footer-el" style={{width: '80%',float: 'right'}}>
            <div>
                {Column('Навигация', ['О нас','Персоналии','Фестиваль 2021'
            ,'Афиша'
            ,'Проекты'
            ,'Медия'
            ,'Новости'])}
            </div>
            <div>
                {Column('Документы', ['Новости','Фестиваль 2021'
            ,'Афиша'
            ,'Проекты'])}
            </div>
            <div>
                {Column('Администрация', ['Авторизоваться'])}
                {Column('Контакты', ['+7(499) 951 01 51','fest@goldenmask.ru'])}
            </div>
        </div>
        </div>
        <div style={{float: 'left', width:'100%'}}><div style={{float:'left'}}>© 1995–2021 Все права защищены</div><div style={{float:'right',color: '#FFFFFF'}}>АНО «Музыкальное Сердце Театра»</div></div>
        </div>
    )
}

function Column(headTitle, elements){
    return (<div>
        <div>
            {Header(headTitle)}
            {elements.map(m => Element(m))}
            
        </div>
    </div>)
}

function Header(title){
    return (<div className="footerHead">{title}</div>)
}

function Element(title){
    return (<div className="footerElement" key={title}>{title}</div>)
}