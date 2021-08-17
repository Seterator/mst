import React, { Component, useEffect, useState, useContext} from 'react';
import { UserContext } from '../../../LoginMiddleware';

export default function EstimationHistory(){

    const {user} = useContext(UserContext);
    const [nomination, setNomination] = useState([]);


    useEffect(()=>{

        fetch('Nomination/GetAll').then(r=>r.ok&&r.json())
        .then(json=>json&&setNomination(json))

    },[])

    return(<div className="container hist-container">
        <h1 className="hist-title" >Ваши оценки</h1>
        {/* изменён текст тайтла */}
        {nomination.map(m=>HistoryElement(m,user.id))}
        <button className="hist-send" onClick={()=>{}}>Отправить</button>
        </div>)
}
function getPerson(data, showId, nominationId){
    let arr = data?.filter(f=> f.showId == showId && f.nominationId == nominationId);
    return arr.length>0&&arr[0].person;
}
function getShowName(data, showId){
    let arr = data?.filter(f=> f.showId == showId);
    return arr.length>0&&arr[0].show.name;
}
function HistoryElement(data, userId){
    let etsArr = [];

    let tt = data.showNominations?.map(m =>{
        let tt1 = m.estimations?.filter(f=>f.refereeId == userId).map(e=>{
            etsArr.push(e);
        })
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
                        <div className="hist-show-name">{getShowName(data.showNominations, m.showId)}</div>
                        <div className="hist-show-memb">{getPerson(data.showNominations, m.showId, m.nominationId)}</div>
                    </div>
                </div>)

        })}
        </div>
        
    </div>)

}