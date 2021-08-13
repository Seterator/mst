import React ,{ Component, useEffect, useState }from 'react';
import { useParams } from 'react-router-dom'
import { getYouTubeUrl } from '../../../helper/IframeHelper'
import { EstimationBlock, EstimationBasePart } from '../../elements/EstimationElements';


export function EstimationWork(){
    const {id} = useParams();
    const[data, setData] = useState({});
    const[nominations, setNominations] = useState([]);
    const[scored, setScored] = useState([]);
    const testData = {nominations:[{title:'Лучший текст песен (авор/перевод)',name:'Лисичка Лисичкова', id:2, showId:1},
    {title:'Лучшее пластическое решение (хореограф)',name:'Лисичка Лисичкова', id:3, showId:1},
    {title:'Лучший текст песен (авор/перевод)',name:'Лисичка Лисичкова', id:4, showId:1},
    {title:'Лучшее пластическое решение (хореограф)',name:'Лисичка Лисичкова', id:5, showId:1},
    {title:'Лучший текст песен (авор/перевод)',name:'Лисичка Лисичкова', id:6, showId:1},
    {title:'Лучшее пластическое решение (хореограф)',name:'Лисичка Лисичкова', id:7, showId:1}],
    shows:[{id:'12',videoLink:"https://www.youtube.com/watch?v=Csa3jiebPF0&pp=sAQA", name:'everyBody', description:'там поющий баран'},
    {id:'13',videoLink:"https://www.youtube.com/watch?v=RhMYBfF7-hE", name:'hypnodancer', description:'играют в карты или настолка'},
    {id:'14',videoLink:"https://www.youtube.com/watch?v=1t_sMynan_k", name:'faradenza', description:'пюре с котлетой'},
    {id:'15',videoLink:"https://www.youtube.com/watch?v=mDFBTdToRmw", name:'skibidi', description:'в пиджаках втроем'},
    {id:'16',videoLink:"https://www.youtube.com/watch?v=9JOyTf1q6gE", name:'moustache', description:'усатые женщины в желтом'}]}

    useEffect(()=>{
        fetch(`Show/GetById?id=${id}`).then(res=>res.json()).then(json => setData(json));
        //setData(testData.videos.filter(f => f.id == id)[0]);
        setNominations(testData.nominations);
        //fetch get scored by userId showId return {nominationId score}
        setScored([{nominationId:3,score:1},{nominationId:5,score:2},{nominationId:6,score:3}])


    },[id]);
    return (<div className="container" style={{maxWidth: '1230px'}}>
        <p style={{margin:'40px 0'}}>Оценивание работ {'>'} {data.name}</p>
        <iframe src={getYouTubeUrl(data.videoLink)} height='690' width='1230'/>
        <p className="nomination-title">{data.name}</p>
            <p className="nomination-description">{data.description}</p>
            <div style={{display:'ruby'}}>
            <a style={{margin:'40px 0 90px 0', display:'block'}} href={`${data.webLink}`}>Перейти на страницу работы</a>
            <div style={{height:'1px', width:'1020px', border:'1px solid white', marginLeft: '30px'}}></div>
            </div>
            {EstimationBlock(id,nominations,scored)}
            {EstimationBasePart(id)}
        </div>)
}


