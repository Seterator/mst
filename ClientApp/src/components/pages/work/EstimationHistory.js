import React, { Component, useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../../LoginMiddleware';
import { WarningMessage } from '../../elements/MessageElements';

export default function EstimationHistory(){

    const {user} = useContext(UserContext);
    const [nomination, setNomination] = useState([]);
    const [shows, setShows] = useState([]);


    useEffect(()=>{

        fetch('Nomination/GetAll').then(r=>r.ok&&r.json())
        .then(json=>json&&setNomination(json))

        fetch('Show/GetAll').then(r=>r.ok&&r.json())
        .then(json=>json&&setShows(json))


    },[])

    return(<div className="container hist-container">
        <h1 className="hist-title" >Ваши оценки</h1>
        {/* изменён текст тайтла */}
        {nomination.map(m=>HistoryElement(m,user.id,shows))}
        {WarningMessage(`Функция окончательного завершения голосования будет доступна с 20 сентября 2021. В данный момент кнопка «Отправить» неактивна.`,'show-warn')}
        <button className="hist-send" onClick={()=>{}}>Отправить</button>
        </div>)
}
function getPerson(data, showId, nominationId){
    let arr = data?.filter(f=> f.showId == showId && f.nominationId == nominationId);
    return arr.length>0&&arr[0].person;
}
function getShowName(data, showId){
    return data.filter(f=>f.id == showId).length>0&&data.filter(f=>f.id == showId)[0].name;
}
function HistoryElement(data, userId,shows){
    let etsArr = [];

    let tt = data.estimations?.filter(f=>f.refereeId == userId && f.nominationId == data.id).map(e=>{
            etsArr.push(e);
        });

    if( etsArr.length == 0){
        return (<div></div>)
    }

    return(<div className="hist-nom-container">
        <div className="hist-nom-title">{data.name}</div>
        <div className="hist-show-container">
        {etsArr.sort((a,b)=>{
            return a?.score - b?.score;
        }).map(m=>{
            return(<div className="hist-nom-panel">
                    <div className={`hist-nom-score score${m?.score}` }>{m?.score}</div>
                    <div className="hist-show-panel">
                        <div className="hist-show-name"><Link to={`work/${m.showId}`}>{getShowName(shows, m.showId)}</Link></div>
                        <div className="hist-show-memb">{getPerson(data.showNominations, m.showId, m.nominationId)}</div>
                    </div>
                </div>)

        })}
        </div>
        
        
    </div>)

}
