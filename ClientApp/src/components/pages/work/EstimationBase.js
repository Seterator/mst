import React, { useEffect, useState, useContext } from 'react';

import { VoteElement } from '../../elements/EstimationElements';
import { WarningMessage} from '../../elements/MessageElements';
import { UserContext } from '../../../LoginMiddleware';

export function EstimationBase(){
    const {user} = useContext(UserContext);
    const [data, setData] = useState([]);
    const [estimations, setEstimations] = useState([]);
    const [view, setView] = useState([]);

    const [filter, setFilter] = useState('');

    const [index, setIndex] = useState(0);

    
    useEffect(()=>{
        fetch('Show/GetAll').then(r => r.json()).then(json =>{

            setData(json.map(v =>{ return {...v, dropDownVisible:false}}));

            let estArr = [];
            json.map(m=>{

                m.estimations.map(e=>{
                    estArr.push({showId:e.showId, nominationId:e.nominationId, score:e.score, refereeId:e.refereeId});
                })
            })

            setEstimations(estArr);

         });

    },[]);

    useEffect(()=>{
        const v = (
        <div   style={{width:'100%', display:'table'}}>
            <div style={{width:'33%', float:'left'}}>

            {data && data?.filter(f=>f.name.toLowerCase().includes(filter?.toLowerCase())).map((v,i) => i%3==0&&VoteElement(v,estimations, user.id,() => dropDownClick(i)))}
            </div>
            <div style={{width:'33%', float:'left'}}>
            {data && data?.filter(f=>f.name.toLowerCase().includes(filter?.toLowerCase())).map((v,i) => i%3==1&&VoteElement(v,estimations, user.id,() => dropDownClick(i)))}
            </div>
            <div style={{width:'33%', float:'left'}}>
            {data && data?.filter(f=>f.name.toLowerCase().includes(filter?.toLowerCase())).map((v,i) => i%3==2&&VoteElement(v,estimations, user.id,() => dropDownClick(i)))}
            </div>
            
        
        
        </div>);
        setView(v);
    },[data, index,filter]);

const dropDownClick = (i) =>{
    data[i].dropDownVisible = !data[i].dropDownVisible;
    setData(data);
    setIndex(index+1);
}


    return(<div className='container' style={{maxWidth:'1291px', paddingLeft: '46px'}}>
        <input className="search-input-image" placeholder="Поиск" onChange={(e)=>setFilter(e.target.value)} />
        {view}
        <div style={{display:'inline-block'}}>
        {WarningMessage('Внезапно, непосредственные участники технического прогресса в равной степени предоставлены сами себе. Значимость этих проблем настолько очевидна, что сложившаяся структура организации представляет собой интересный эксперимент проверки новых принципов формирования материально-технической и кадровой базы.', 'show-warn')}
        <button style={{width:'1230px', height:'55px', margin:'10px 0'}}>Подтвердить и отправить</button>
        </div>

        </div>)



}