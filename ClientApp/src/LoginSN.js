import React, { useEffect, useState } from 'react';
import { Footer } from './components/Footer';

export default function LoginSN(){

    useEffect(()=>{
        let clList = document.getElementById("notWelcome").classList;
        if(!clList.contains("visibility-hidden")){
            clList.toggle("visibility-hidden")
        }
    },[])


    return(<div><div className="container">
        <div className="sn-image" style={{background:'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 44.61%, rgba(0, 0, 0, 0.5) 100%), url(https://avatars.mds.yandex.net/get-zen_doc/2417275/pub_5ebe5ebb40116e44e411567a_5ebe5f0691f40d603f00424f/scale_1200)'}}></div>
       
        <h1 className="sn-title">Название пьесы</h1>
        <div className="sn-description">Описание пьесы</div>
        <div className="sn-auth">Авторизироваться</div>
    
    </div>
    <Footer/>
    </div>)
}