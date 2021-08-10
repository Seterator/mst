import React ,{ Component, useEffect, useState }from 'react';
import { useParams } from 'react-router-dom'
import { getYouTubeUrl } from '../../../helper/IframeHelper'
import { EstimationBlock, EstimationBasePart } from '../../elements/EstimationElements';


export function EstimationWork(){
    const {id} = useParams();
    const[data, setData] = useState({});
    const[nominations, setNominations] = useState([]);
    const testData = {nominations:[{title:'Лучший текст песен (авор/перевод)',name:'Лисичка Лисичкова', id:2},
    {title:'Лучшее пластическое решение (хореограф)',name:'Лисичка Лисичкова', id:3},
    {title:'Лучший текст песен (авор/перевод)',name:'Лисичка Лисичкова', id:4},
    {title:'Лучшее пластическое решение (хореограф)',name:'Лисичка Лисичкова', id:5},
    {title:'Лучший текст песен (авор/перевод)',name:'Лисичка Лисичкова', id:6},
    {title:'Лучшее пластическое решение (хореограф)',name:'Лисичка Лисичкова', id:7}],
    videos:[{id:'12',url:"https://www.youtube.com/watch?v=Csa3jiebPF0&pp=sAQA", title:'everyBody', other:'там поющий баран'},
    {id:'13',url:"https://www.youtube.com/watch?v=RhMYBfF7-hE", title:'hypnodancer', other:'играют в карты или настолка'},
    {id:'14',url:"https://www.youtube.com/watch?v=1t_sMynan_k", title:'faradenza', other:'пюре с котлетой'},
    {id:'15',url:"https://www.youtube.com/watch?v=mDFBTdToRmw", title:'skibidi', other:'в пиджаках втроем'},
    {id:'16',url:"https://www.youtube.com/watch?v=9JOyTf1q6gE", title:'moustache', other:'усатые женщины в желтом'}]}

    useEffect(()=>{
        //fetch(`/api/${videoId}`).then(res=>res.json()).then(json => setData(json));
        setData(testData.videos.filter(f => f.id == id)[0]);
        setNominations(testData.nominations);
    },[id]);
    return (<div>
        <iframe src={getYouTubeUrl(data.url)} height='690' width='1230'/>
        <p style={{fontSize: "24px", lineHeight: '34px'}}>{data.title}</p>
            <p style={{fontSize: "16px", lineHeight: '26px'}}>{data.other}</p>
            <a href={`${data.url}`}>Перейти на страницу работы</a>
            {EstimationBlock(id,nominations)}
            {EstimationBasePart(id)}
        </div>)
}


