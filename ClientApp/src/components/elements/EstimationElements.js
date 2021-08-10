import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import {WarningHorizontMessage} from './MessageElements'

export function VoteElement(data, f){

    return(
    <span style={{display:'block', width:'390px', margin:'20px', float:'left',borderStyle: 'solid',
    borderImage: 'linear-gradient(to left, #770D37, #211452) 0 0 100% 0', paddingBottom:'20px'}}>
    <Link to={`/work/${data.videoId}`}  style={{display:'block'}}>
    <div height='247' width='390' style={{
        backgroundImage:`url(${data.image})`
        , width:'390px', height:'247px', position:'relative', opacity:'0.7'}}>
            <div style={{position:'absolute', bottom:'10px', left:'0', right:'0', height:'30px', textAlign:'center'}}>
            <button className="vote-button" hidden={!data.options?.some(s => s == 'notVoting')}>Без голосования</button>
            <button className="vote-button" hidden={!data.options?.some(s => s == 'viewed')} >Просмотрено</button>
            <button className="vote-button" hidden={!data.options?.some(s => s == 'estimated')} >Оценено</button>
            </div>
        
    </div>
            
            </Link>
             <p style={{fontSize: "24px", lineHeight: '34px'}}>{data.title}</p>
            <p style={{fontSize: "16px", lineHeight: '26px'}}>{data.other}</p>
            <button style={{opacity:'0.5', background:'none'}} onClick={f}>Посмотреть список номинаций</button>
            {DropDownNomination(data.nominations, data.dropDownVisible)}
            </span> 
            )
}

function DropDownNomination(data, visible){

    let d = visible ? 'block' : 'none';
    return(<a style={{display:`${d}`}}>
        {data?.map((v,i) => <div style={{fontFamily: 'Optima Cyr',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: '14px',
lineHeight: '22px',
margin:'5px 0',
letterSpacing: '0.05em',

color: '#FFFFFF'}} key={i}>{v.title} ({v.position})</div>)}
        </a>)
}

export function EstimationBlock(videoId, nominations){

    const [choosenNomination, chooseNomination] = useState(-1);
    const [choosenPlace, choosePlace] = useState(-1);

    useEffect(()=>{
        chooseNomination(-1);
        choosePlace(-1);
    },[videoId])

    function nominationClick(nomId){
        choosenNomination == nomId 
        ?chooseNomination(-1)
        :chooseNomination(nomId);
        choosePlace(-1)
    }

    function placeClick(placeId){
        if(choosenNomination ==-1){
            return;
        }

        choosenPlace == placeId 
        ?choosePlace(-1)
        :choosePlace(placeId);
    }

    function saveClick(){
        if(choosenPlace ==-1 || choosenNomination ==-1){
            return;
        }
        alert(`${choosenPlace} ${choosenNomination}`)
    }

    return (<div><div>
        <h1>Выбор номинации для оценивания</h1>
        {WarningHorizontMessage('Внезапно, непосредственные участники технического прогресса в равной степени предоставлены сами себе. Значимость этих проблем настолько очевидна, что сложившаяся структура организации представляет собой интересный эксперимент проверки новых принципов формирования материально-технической и кадровой базы.')}
        <div style={{width:'1200px', display:'table', backgroundColor:'white', padding:'45px 75px',margin: '10px 0 10px 0'}}>
        {nominations?.map((v,i)=><div onClick={()=>nominationClick(v.id)} style={{display:'table-row', float:'left', margin:'15px 25px',width:'475px',opacity:`${choosenNomination !== -1 && choosenNomination !== v.id?'0.4':'1'}`, height:'55px', backgroundColor:`${choosenNomination == v.id?'black':'#770D37'}`, borderRadius:'5px'}} key={i}>
            <p>{v.title}</p>
            <p>{v.name}</p>
            </div>)}

            
        </div>
    </div>
    <div style={{width:'1200px', height:'200px', backgroundColor:'grey', padding:'50px 105px 40px 105px',margin: '10px 0', opacity:`${choosenNomination==-1?'0.4':'1'}`}}>
                <p style={{fontSize: '24px',lineHeight: '34px'}}>Оцените работу</p>
                <div>
                <button onClick={()=>placeClick(1)} style={{width:'70px', height:'55px',margin: '20px 10px', opacity:`${choosenPlace==2 || choosenPlace==3?'0.4':'1'}`}}>1</button>
                <button onClick={()=>placeClick(2)} style={{width:'70px', height:'55px',margin: '20px 10px', opacity:`${choosenPlace==1 || choosenPlace==3?'0.4':'1'}`}}>2</button>
                <button onClick={()=>placeClick(3)} style={{width:'70px', height:'55px',margin: '20px 10px', opacity:`${choosenPlace==2 || choosenPlace==1?'0.4':'1'}`}}>3</button>
                <button onClick={()=>saveClick()} style={{float:'right',width: '168px',height: '55px', background: '#111111', borderRadius: '5px', opacity:`${choosenPlace==-1?'0.4':'1'}`}}>Сохранить</button>
                </div>
                
                </div>
                <p>*Напоминаем, что данный раздел отвечает лишь за оценивание работы по конкретным номинациям, для того чтобы Ваши оценки были учтены Вам необходимо перейти в раздел История оценивания и подтвердить отправку результата на сервер.</p>
    </div>)
}

export function EstimationBasePart(id){
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
, videoId:'15', options:[],
title:'Оказывается, известный инсайдер,в преддверии важного события, продолжает удивлять',
other: 'Разнообразный и богатый опыт говорит нам, что консультация с широким активом не оставляет шанса для прогресса профессионального сообщества.',
nominations:[{title:'Лучший текст песен (автор/перевод)', position:2}, {title:'Лучшее пластическое решение (хореограф)', position:3}]},
{image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200'
, videoId:'16', options:['viewed'],
title:'Оказывается, известный инсайдер,в преддверии важного события, продолжает удивлять',
other: 'Разнообразный и богатый опыт говорит нам, что консультация с широким активом не оставляет шанса для прогресса профессионального сообщества.',
nominations:[{title:'Лучший текст песен (авор/перевод)', position:2}, {title:'Лучшее пластическое решение (хореограф)', position:3}]}]}

const [data, setData] = useState([]);
    const [view, setView] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        setData(testData.members.filter(f=>!f.options.some(s=>s=='notVoting') && !f.options.some(s=>s== 'estimated') && f.videoId != id ).map(v =>{ return {...v, dropDownVisible:false}})  );
        //fetch('getActiveRequest').then(res=>res.json()).then(json => setData(json));

    },[id]);
    useEffect(()=>{
        const v = (<div className='container'  style={{display:'inline-block'}}>
        {data && data?.map((v,i) => VoteElement(v,() => dropDownClick(i)))}
        </div>);
        setView(v);
    },[data, index]);

    const dropDownClick = (i) =>{
        data[i].dropDownVisible = !data[i].dropDownVisible;
        setData(data);
        setIndex(index+1);
    }

    return(view)
}