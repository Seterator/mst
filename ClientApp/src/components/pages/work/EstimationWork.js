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
        if(id&&user?.id){

        
        fetch(`Show/GetById?id=${id}`).then(res=>res.json()).then(json => {

            let arr = [];
            setNominations(json.showNominations);
            setData(json)

        }
            
            );

            fetch(`Show/GetEstimations?refereeId=${user.id}&showId=${id}`).then(res=>res.json()).then(json => setScored(json));
    }

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


