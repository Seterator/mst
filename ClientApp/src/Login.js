import React, { useState } from 'react';
import { Footer } from './components/Footer';

export function Login(props){
    const [userName, setUserName] = useState('lisa@mail.ru');
    const [password, setPassword] = useState('');


    return(<div>
        <div style={{maxWidth: '1140px',
marginRight: 'auto',
marginLeft: 'auto',
textAlign: 'center',
minHeight: '760px',
padding: '200px 300px'}}>
    <p style={{fontWeight: 'bold',
fontSize: '42px',
lineHeight: '52px',
textAlign: 'center',
letterApacing: '0.05em',
textTransform: 'uppercase'}}>Авторизация для академиков</p>
        <input style={{width:'390px', height:'55px', margin:'10px 0'}} onChange={(e) => { setUserName(e.target.value) }} placeholder='Логин или почта' defaultValue='lisa@mail.ru'/>
        <input style={{width:'390px', height:'55px', margin:'10px 0'}} onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Пароль'/>
        <button style={{width:'390px', height:'55px', margin:'10px 0'}} onClick={()=>props.login(userName,password)}>Войти</button>
        </div>
        {Footer()}
        </div>)
}