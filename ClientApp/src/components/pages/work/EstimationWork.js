import React ,{ Component, useEffect, useState }from 'react';
import { useParams } from 'react-router-dom'
import { getYouTubeUrl } from '../../../helper/IframeHelper'
import { EstimationBlock, EstimationBasePart } from '../../elements/EstimationElements';


export function EstimationWork(){
    const {id} = useParams();

    const[data, setData] = useState({});
    const[nominations, setNominations] = useState([]);
    const[scored, setScored] = useState([]);
 
    useEffect(()=>{
        fetch(`Show/GetById?id=${id}`).then(res=>res.json()).then(json => {

            let arr = [];
            setNominations(json.showNominations);
            setData(json)
            json.showNominations.map(m=>{
                m.estimations.map(e=>{
                    arr.push(e);

                })
            })

            setScored(arr);
        }
            
            );

    },[id]);
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


