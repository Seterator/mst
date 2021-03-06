import React, { useEffect, useState } from 'react';
import Table from '../misc/Table';
import AddShowModal from '../modal/AddShowModal'
import BlockRefereeModal from '../modal/BlockRefereeModal'

export function ShowListView(){

    const [showData, setShowData] = useState({})
    const [showEditData, setShowEditData] = useState({})
    const [showDataView, setShowDataView] = useState({})
    const [members, setMembers] = useState([])
    const [membersBlocked, setMembersBlocked] = useState([])
    const [isModalAddOpen, OpenAddModal] = useState(false);
    const [isModalEditOpen, OpenEditModal] = useState(false);
    const [isModalBlockOpen, OpenBlockModal] = useState(false);
    const [changeIndex, setChangeIndex] = useState(1);
    const [filter, setFilter] = useState('');

    useEffect(()=>{
       fetch('Show/GetAll').then(r => r.json()).then(json =>{
           setShowData({data:json, columns:[
               {key:'id', value:'Id'},
               {key:'name', value:'Название'},
               {key:'shortDescription', value:'Короткое описание'},
               {key:'webLink', value:'Ссылка'},
               {key:'videoLink', value:'Видео'}
           ],
       setdata:[
           { execute:(i)=>deleteShow(i),title:'Удалить'},
           { execute:(i)=>editShow(i),title:'Изменить'},
           { execute:(i)=>BlockRefereeModalOpen(i),title:'Заблокированные пользователи'},
           ]});

           let arr =[];
           json.map(m=>{
               let t = m.blockedReferees?.map(b=>arr.push(b));
           })
           setMembersBlocked(arr);

       });

       fetch('User/GetAll').then(r => r.json()).then(json =>setMembers(json));

    },[])
    useEffect(()=>{
        showEditData&&showEditData.id&&OpenEditModal(true);
        showEditData&&showEditData.blockId&&OpenBlockModal(true);
    },[showEditData]);

    useEffect(()=>{
        !isModalEditOpen&&!isModalBlockOpen&&setShowEditData({});
    },[isModalEditOpen, isModalBlockOpen]);
    useEffect(()=>{
        filter && filter!=''
        ? setShowDataView({...showData,data:showData?.data?.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()))})
        : setShowDataView(showData);
    },[filter]);


    useEffect(()=>{
        setShowDataView({...showData,setData:[
            { execute:(i)=>deleteShow(i),title:'Удалить'},
            { execute:(i)=>editShow(i),title:'Изменить'},
            { execute:(i)=>BlockRefereeModalOpen(i),title:'Заблокированные пользователи'},
            ]});

    },[showData,changeIndex]);


function deleteShow(i){
    if(window.confirm(`Удалить cпектакль`)){

        fetch(`Show/Delete?id=${i.id}`, {
            method: 'delete'
           }).then(res=>{
               if(!res?.ok){
                   return;
               }
            let toDelete = showData?.data?.filter(f => f.id == i.id)[0]
            let index = showData?.data?.indexOf(toDelete);
            let newData = showData.data;
            newData.splice(index,1);
            setShowData({...showData,data: newData});
            setChangeIndex(changeIndex+1)

           });
 
    }
    
}
function editShow(i){
    setShowEditData(i);
}

function showAdded(d){
 
    let formData = new FormData();
    formData.append('file', d.image);
    formData.append('name', d.name);
    formData.append('description', d.description);
    formData.append('shortDescription', d.shortDescription);
    formData.append('webLink', d.webLink);
    formData.append('videoLink', d.videoLink);
 
    fetch(`Show/Create`, {
        method: 'post',
        body:formData
        
       }).then(r => {
           if(!r.ok){
               return;
           }
        const nextId = showData?.data?.length>0 ? Math.max(...showData?.data?.map(item => item.id)) +1: 1;
        let newItem = {...d,id:nextId};
        let newData = [...showData.data, newItem]
        setShowData({...showData,data: newData});
       });

    
}
function showEdited(d){
    let formData = new FormData();
    formData.append('id', showEditData.id);
    formData.append('file', d.image);
    formData.append('name', d.name);
    formData.append('description', d.description);
    formData.append('shortDescription', d.shortDescription);
    formData.append('webLink', d.webLink);
    formData.append('videoLink', d.videoLink);


    fetch(`Show/Edit`, {
        method: 'post',
        body:formData
        
       }).then(r => {
        if(!r.ok){
            return;
        }
    let newArr = showData?.data;
    let toEdit = newArr?.filter(f => f.id == showEditData.id)[0]
    let index = newArr?.indexOf(toEdit);
    let newData = {...newArr[index],...d};
    newArr[index] = newData;
    setShowData({...showData,data: newArr});
    });
}
  
function BlockRefereeModalOpen(show){

    setShowEditData({...showEditData, blockId:show.id});
}

function MembersBlockAction(members){
    fetch(`Show/BlockReferee?showId=${showEditData.blockId}`,{
        method:'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(members)
    }).then(r=>{
        if(!r.ok) return;


        let newArr = membersBlocked;
        membersBlocked
            .filter(f=>f.showId == showEditData.blockId)
            .map(m=>newArr.splice(newArr.indexOf(m),1));
        setMembersBlocked([...newArr, ...members]);

    } )
}

    return(<div>
        <div><input onChange={(e)=>setFilter(e.target.value)}></input><a onClick={()=>OpenAddModal(true)}>Добавить спектакль</a></div>
        {Table(showDataView)}
        <AddShowModal submit ={showAdded} cancel={() => { OpenAddModal(false) }} isOpen={isModalAddOpen} />
    <AddShowModal submit ={showEdited} cancel={() => { OpenEditModal(false) }} isOpen={isModalEditOpen} preValue ={showEditData}/>
        <BlockRefereeModal members={members} checked={membersBlocked} isOpen={isModalBlockOpen} cancel={()=>OpenBlockModal(false)} showId={showEditData.blockId} submit={MembersBlockAction}/>
    </div>)
}