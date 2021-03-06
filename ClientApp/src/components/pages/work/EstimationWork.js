import React ,{ Component, useEffect, useState, useContext }from 'react';
import { useParams } from 'react-router-dom'
import { getYouTubeUrl } from '../../../helper/IframeHelper'
import { EstimationBlock, EstimationBasePart } from '../../elements/EstimationElements';
import { UserContext } from '../../../LoginMiddleware';


export function EstimationWork(){
    const {id} = useParams();
    const {user} = useContext(UserContext);

    const[data, setData] = useState({});
    const[isBlocked, setIsBlocked] = useState(false);
    
    const[nominations, setNominations] = useState([]);
    const[scored, setScored] = useState([]);
 
    useEffect(()=>{

        const ff = async()=>{
        if(id&&user?.id){
            window.scrollTo(0,100);
            let query = [`Show/GetById?id=${id}`, `Show/GetEstimations?refereeId=${user.id}&showId=${id}`]
            let results = await Promise.all( query.map(async q =>{

                return await fetch(q).then(r=>r.ok&&r.json());
              
            }))

            let json = results[0];
            let scored = results[1];

            setNominations(json.showNominations);
            setData(json)
            setScored(scored)
            setIsBlocked(json.blockedReferees.filter(f=>f.refereeId == user?.id).length>0 ||json.isBlocked)

        }
    }
    ff();

    },[id,user]);
    return (<div className="container" style={{maxWidth: '1230px'}}>
        <p style={{margin:'40px 0'}}>Оценка работ {'>'} {data.name}</p>
        <iframe src={getYouTubeUrl(data.videoLink)} height='690' width='1230' allow='autoplay; fullscreen' webkitallowfullscreen mozallowfullscreen allowfullscreen/>
        <p className="nomination-title">{data.name}</p>
            <p className="nomination-description">{data.description}</p>
            <div style={{display:'inline-flex'}}>
            <a style={{margin:'40px 0 90px 0', display:'block'}} onClick={()=>window.open(`${data.webLink}`,"_blank")}>Перейти на страницу спектакля</a>
            <div style={{height:'1px', width:'1045px', border:'1px solid white', marginLeft: '30px', marginTop:'45px'}}></div>
            </div>
            {EstimationBlock(id,nominations,scored,isBlocked)}
            {EstimationBasePart(id)}
        </div>)
}


