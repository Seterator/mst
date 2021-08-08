import React, { useEffect, useState } from 'react';
import Table from '../misc/Table';
import AddProfileModal from '../modal/AddProfileModal'

export function NominationListView(){

    const [nominationData, setNominationData] = useState({})
    const [isModalOpen, OpenModal] = useState(false);

    useEffect(()=>{
        setNominationData(testData);
    },[])

    const testData = {
        columns:[
            {key:'id', value:'Id'},
            {key:'title', value:'Название'},
            {key:'other', value:'Описание'}
        ],
data:[
    { id: 5, title:'Лучшие танцы обниманцы', other:'не знаю надо ли'},
    { id: 6, title:'Лучшее метание молота', other:'хз'}
    ],
setData:[
    { execute:(i)=>addNomination(i),title:'Добавить'},
    { execute:(i)=>deleteNomination(i),title:'Удалить'},
    { execute:(i)=>editNomination(i),title:'Изменить'}
    ]
};
const addNomination = (i)=>OpenModal(true);
const deleteNomination = (i)=>alert(`deleteNomination ${JSON.stringify(i)}`);
const editNomination = (i)=>OpenModal(true);
  
    return(<div>{Table(nominationData)}
    <AddProfileModal cancel={() => { OpenModal(false) }} isOpen={isModalOpen} /></div>)
}