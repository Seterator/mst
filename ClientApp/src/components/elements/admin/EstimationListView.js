import React, { useEffect, useState } from 'react';
import Table from '../misc/Table';
import AddProfileModal from '../modal/AddProfileModal'

export function EstimationListView(){

    const [estimationData, setEstimationData] = useState({})
    const [isModalOpen, OpenModal] = useState(false);

    useEffect(()=>{
        setEstimationData(testData);
    },[])

    const testData = {
        columns:[
            {key:'id', value:'Id'},
            {key:'url', value:'Url'},
            {key:'title', value:'Название'},
            {key:'other', value:'Описание'},
            {key:'nominations', value:'Номинации'}
        ],
data:[
    { id: 5, url: 'http://localhost:3000/admin', title:'Лучшая админка в мире', other:'Зайди посмотри как все удобно', nominations:[{title:'лучшее видео', name:'я'},{title:'лучшие танцы', name:'ты'}]},
    { id: 6, url: 'http://localhost:3000/work', title:'Хочешь бабала, иди работай', other:'читай выше', nominations:[{title:'лучшее видео', name:'он'},{title:'лучшие танцы', name:'я'}]}
    ],
setData:[
    { execute:(i)=>addEstimation(i),title:'Добавить'},
    { execute:(i)=>deleteEstimation(i),title:'Удалить'},
    { execute:(i)=>editEstimation(i),title:'Изменить'}
    ]
};
const addEstimation = (i)=>OpenModal(true);
const deleteEstimation = (i)=>alert(`deleteEstimation ${JSON.stringify(i)}`);
const editEstimation = (i)=>OpenModal(true);
  
    return(<div>{Table(estimationData)}
    <AddProfileModal cancel={() => { OpenModal(false) }} isOpen={isModalOpen} /></div>)
}