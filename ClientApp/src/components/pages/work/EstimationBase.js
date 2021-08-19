import React, { useEffect, useState, useContext } from 'react';

import { VoteElement } from '../../elements/EstimationElements';
import { WarningMessage} from '../../elements/MessageElements';
import { UserContext } from '../../../LoginMiddleware';
import { EstimationBasePart } from '../../elements/EstimationElements';

export function EstimationBase(){
    const {user} = useContext(UserContext);
    const [data, setData] = useState([]);
    const [estimations, setEstimations] = useState([]);
    const [view, setView] = useState([]);

    const [filter, setFilter] = useState('');

    const [index, setIndex] = useState(0);

    
    // useEffect(()=>{

    //     const ff = async()=>{

    //     if(user?.id>0){

    //         let query = ['Show/GetAll', `User/AvailableCompetitions?refereeId=${user.id}`]
    //         let results = await Promise.all( query.map(async q =>{

    //             return await fetch(q).then(r=>r.ok&&r.json());
              
    //         }))
   

    //         let json = results[0];
    //         let availableCompetitions = results[1];

    //         let arr =[];
    //         json.map(f=>{
    //             f.showNominations.map(s=>{
    //                 if(availableCompetitions.map(a=>a.competitionId).includes(s.nomination.competitionId)){
    //                 arr.push(f.id) 
    //                 }
    //             })
    //         })
  
    //         let sourceData = json.filter(f=>arr.includes(f.id));

    //         setData(sourceData.map(v =>{ return {...v, dropDownVisible:false}}));

    //         let estArr = [];
    //         sourceData.map(m=>{

    //             m.estimations.map(e=>{
    //                 estArr.push({showId:e.showId, nominationId:e.nominationId, score:e.score, refereeId:e.refereeId});
    //             })
    //         })

    //         setEstimations(estArr);

    //     }
    // }

    // ff();

    // },[user]);

    // useEffect(()=>{
    //     const v = (
    //     <div   style={{width:'100%', display:'table'}}>
    //         <div style={{width:'33%', float:'left'}}>

    //         {data && data?.filter(f=>f.name.toLowerCase().includes(filter?.toLowerCase())).map((v,i) => i%3==0&&VoteElement(v,estimations, user.id,() => dropDownClick(i)))}
    //         </div>
    //         <div style={{width:'33%', float:'left'}}>
    //         {data && data?.filter(f=>f.name.toLowerCase().includes(filter?.toLowerCase())).map((v,i) => i%3==1&&VoteElement(v,estimations, user.id,() => dropDownClick(i)))}
    //         </div>
    //         <div style={{width:'33%', float:'left'}}>
    //         {data && data?.filter(f=>f.name.toLowerCase().includes(filter?.toLowerCase())).map((v,i) => i%3==2&&VoteElement(v,estimations, user.id,() => dropDownClick(i)))}
    //         </div>
            
        
        
    //     </div>);
    //     setView(v);
    // },[data, index,filter]);

// const dropDownClick = (i) =>{
//     data[i].dropDownVisible = !data[i].dropDownVisible;
//     setData(data);
//     setIndex(index+1);
// }


    return(<div className='container' style={{maxWidth:'1291px', paddingLeft: '46px'}}>
        <input className="search-input-image" placeholder="Поиск" onChange={(e)=>setFilter(e.target.value)} />
        {EstimationBasePart()}
        <div style={{display:'inline-block'}}>
        {WarningMessage('На данный момент доступен только просмотр работ без возможности оценивания. Совсем скоро Вы сможете оценить доступные работы по шкале от первого до третьего места.', 'show-warn')}
        {/* изменён текст предупреждения */}
        <button style={{width:'1230px', height:'55px', margin:'10px 0'}}>Подтвердить и отправить</button>
        </div>

        </div>)



}