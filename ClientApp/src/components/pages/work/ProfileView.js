import React, {useEffect, useState} from 'react';

import '../../../style/_label.scss'
import '../../../style/staff.scss'

export function ProfileView(){
    const [data, setData] = useState({});
    useEffect(()=>{
        const testData = {fio:'Лиса Лисичка Лисичкова', 
            image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200', 
            work:'Академик', 
            city:'г.Тула', 
            mail:'Lisa@mail.ru', 
            other:'Таким образом, убеждённость некоторых оппонентов позволяет выполнить важные задания по разработке прогресса профессионального сообщества. Разнообразный и богатый опыт говорит нам, что высококачественный прототип будущего проекта представляет собой интересный эксперимент проверки переосмысления внешнеэкономических политик. Предварительные выводы неутешительны: существующая теория не оставляет шанса для дальнейших направлений развития. Являясь всего лишь частью общей картины, тщательные исследования конкурентов лишь добавляют фракционных разногласий и объективно рассмотрены соответствующими инстанциями. Некоторые особенности внутренней политики могут быть функционально разнесены на независимые элементы'};
        
            setData({
                fio:testData.fio, 
                image:testData.img, 
                work:testData.work, 
                city:testData.city, 
                mail:testData.mail, 
                other:testData.other})
        //     fetch('api')
        // .then(res=>res.json())
        // .then(json=>setData({
        //     fio:json.fio, 
        //     image:json.img, 
        //     work:json.work, 
        //     city:json.city, 
        //     mail:json.mail, 
        //     other:json.other}));
    },[]);
    return(
        <section className="section section-content">
            <div className="container">
                <div className="nav-content president">
                    <h2 className="nav-content-title">{data.fio}</h2>
                    <p className="mail">{data.work} <div className="dot"></div> {data.city} <div className="dot"></div> {data.mail}</p>
                    <div className="twoCol">
                        <div className="about">
                            <img height="252px" width="182px" src="https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200" alt=""/>
                        </div>
                        <div className="content">
                            <p className="paragraph">{data.other}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}