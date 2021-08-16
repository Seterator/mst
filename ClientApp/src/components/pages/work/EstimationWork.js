import React ,{ Component, useEffect, useState, useContext }from 'react';
import { useParams } from 'react-router-dom'
import { getYouTubeUrl } from '../../../helper/IframeHelper'
import { EstimationBlock, EstimationBasePart } from '../../elements/EstimationElements';
import { UserContext } from '../../../LoginMiddleware';


export function EstimationWork(){
    const {id} = useParams();
    const {user} = useContext(UserContext);

    const[data, setData] = useState({});
    const[nominations, setNominations] = useState([]);
    const[scored, setScored] = useState([]);
 
    useEffect(()=>{

        const ff = async()=>{
        if(id&&user?.id){
            let query = [`Show/GetById?id=${id}`, `Show/GetEstimations?refereeId=${user.id}&showId=${id}`]
            let results = await Promise.all( query.map(async q =>{

                return await fetch(q).then(r=>r.ok&&r.json());
              
            }))
   


            let json = results[0];
            let scored = results[1];

            setNominations(json.showNominations);
            setData(json)
            setScored(scored)

        }
    }
    ff();

    },[id,user]);
    return (<div className="container" style={{maxWidth: '1230px'}}>
        <p style={{margin:'40px 0'}}>Оценивание работ {'>'} {data.name}</p>
        <iframe src={getYouTubeUrl(data.videoLink)} height='690' width='1230'/>
        <p className="nomination-title">{data.name}</p>
            <p className="nomination-description">{data.description}</p>
            <div style={{display:'inline-flex'}}>
            <a style={{margin:'40px 0 90px 0', display:'block'}} href={`${data.webLink}`}>Перейти на страницу работы</a>
            <div style={{height:'1px', width:'1045px', border:'1px solid white', marginLeft: '30px', marginTop:'45px'}}></div>
            </div>
            {EstimationBlock(id,nominations,scored)}
            {EstimationBasePart(id)}
        </div>)
}


