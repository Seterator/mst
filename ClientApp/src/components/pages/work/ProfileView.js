import React, {useEffect, useState, useContext} from 'react';
import {UserContext } from '../../../LoginMiddleware'

import '../../../style/_label.scss'
import '../../../style/staff.scss'

export function ProfileView(){
    const [data, setData] = useState({});
    const [dataView, setDataView] = useState({});
    const {user} = useContext(UserContext);
    useEffect(()=>{
        const testData = {fio:'Лиса Лисичка Лисичкова', 
            image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200', 
            work:'Академик', 
            city:'г.Тула', 
            mail:'Lisa@mail.ru', 
            other:'Таким образом, убеждённость некоторых оппонентов позволяет выполнить важные задания по разработке прогресса профессионального сообщества. Разнообразный и богатый опыт говорит нам, что высококачественный прототип будущего проекта представляет собой интересный эксперимент проверки переосмысления внешнеэкономических политик. Предварительные выводы неутешительны: существующая теория не оставляет шанса для дальнейших направлений развития. Являясь всего лишь частью общей картины, тщательные исследования конкурентов лишь добавляют фракционных разногласий и объективно рассмотрены соответствующими инстанциями. Некоторые особенности внутренней политики могут быть функционально разнесены на независимые элементы'};
        if(user?.id > 0){
            fetch(`User/GetById?id=${user.id}`)
            .then(r=>r.json())
            .then(res => {

                setData({...res, avatar:`data:image/png;base64,${res.avatar}`});
            });
        }
            

    },[user]);

    useEffect(()=>{
        setDataView(data);
    },[data]);
    return(
        
            <div className="container profile-container">
                <div className="profile-left">
                    <div className="about">
                        <img height="350px" width="285px" src={dataView.avatar} alt=""/>
                    </div>
                </div>
                <div className="profile-right">
                    <div style={{textAlign:'left'}}>
                        <div className="nav-content-title profile-title">{dataView.fullName}</div>
                        <div className="mail profile-mail">{dataView.city} <div className="dot"></div> {dataView.email}</div>
                    </div>
                    <div className="content">
                        <p className="paragraph profile-bio">{dataView.bio}</p>
                    </div>
                </div>

            </div>
        
    )
}