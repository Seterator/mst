import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Container from 'reactstrap/lib/Container';

import { VoteElement } from '../../elements/EstimationElements';
import { WarningMessage} from '../../elements/MessageElements';

export function EstimationBase(){
    const [data, setData] = useState([]);
    const [view, setView] = useState([]);

    const [filter, setFilter] = useState('');

 

    const [index, setIndex] = useState(0);

    const testData ={ nominations:['Лучший текст песен (авор/перевод)','Лучшее пластическое решение (хореограф)','Лучшее световое оформление (художник по свету)'],
    members: [{image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200'
, videoId:'12', options:['viewed', 'estimated', 'notVoting'], 
title:'Оказывается, известный инсайдер,в преддверии важного события, продолжает удивлять',
other: 'Разнообразный и богатый опыт говорит нам, что консультация с широким активом не оставляет шанса для прогресса профессионального сообщества.',
nominations:[{title:'Лучшее световое оформление (художник по свету)', position:1}, {title:'Лучшее пластическое решение (хореограф)', position:2}]},
{image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200'
, videoId:'13', options:['viewed', 'notVoting'],
title:'Оказывается, известный инсайдер,в преддверии важного события, продолжает удивлять',
other: 'Разнообразный и богатый опыт говорит нам, что консультация с широким активом не оставляет шанса для прогресса профессионального сообщества.',
nominations:[{title:'Лучший текст песен (автор/перевод)', position:2}, {title:'Лучшее пластическое решение (хореограф)', position:3}]},
{image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200'
, videoId:'14', options:['viewed', 'notVoting'],
title:'Оказывается, известный инсайдер,в преддверии важного события, продолжает удивлять',
other: 'Разнообразный и богатый опыт говорит нам, что консультация с широким активом не оставляет шанса для прогресса профессионального сообщества.',
nominations:[{title:'Лучший текст песен (автор/перевод)', position:2}, {title:'Лучшее пластическое решение (хореограф)', position:3}]},
{image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200'
, videoId:'15', options:['viewed', 'notVoting'],
title:'Оказывается, известный инсайдер,в преддверии важного события, продолжает удивлять',
other: 'Разнообразный и богатый опыт говорит нам, что консультация с широким активом не оставляет шанса для прогресса профессионального сообщества.',
nominations:[{title:'Лучший текст песен (автор/перевод)', position:2}, {title:'Лучшее пластическое решение (хореограф)', position:3}]},
{image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200'
, videoId:'16', options:['viewed', 'notVoting'],
title:'Оказывается, известный инсайдер,в преддверии важного события, продолжает удивлять',
other: 'Разнообразный и богатый опыт говорит нам, что консультация с широким активом не оставляет шанса для прогресса профессионального сообщества.',
nominations:[{title:'Лучший текст песен (авор/перевод)', position:2}, {title:'Лучшее пластическое решение (хореограф)', position:3}]}]}
    useEffect(()=>{
        setData(testData.members.map(v =>{ return {...v, dropDownVisible:false}})  );
        //fetch('getActiveRequest').then(res=>res.json()).then(json => setData(json));

    },[]);

    useEffect(()=>{
        const v = (
        <div className='container'  style={{display:'inline'}}>
            
        {data && data?.filter(f=>f.title.toLowerCase().includes(filter?.toLowerCase())).map((v,i) => VoteElement(v,() => dropDownClick(i)))}
        
        </div>);
        setView(v);
    },[data, index,filter]);

const dropDownClick = (i) =>{
    data[i].dropDownVisible = !data[i].dropDownVisible;
    setData(data);
    setIndex(index+1);
}


    return(<div className='container' style={{maxWidth:'1290px'}}>
        <input className="search-input-image" placeholder="Поиск" onChange={(e)=>setFilter(e.target.value)} />
        {view}
        <div style={{display:'inline-block'}}>
        {WarningMessage('Внезапно, непосредственные участники технического прогресса в равной степени предоставлены сами себе. Значимость этих проблем настолько очевидна, что сложившаяся структура организации представляет собой интересный эксперимент проверки новых принципов формирования материально-технической и кадровой базы.', 'show-warn')}
        <button style={{width:'1230px', height:'55px', margin:'10px 0'}}>Подтвердить и отправить</button>
        </div>

        </div>)



}