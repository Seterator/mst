import React, { useEffect, useState } from 'react';
import Table from '../misc/Table';
import AddProfileModal from '../modal/AddProfileModal'

export function ProfileListView(){

    const [profileData, setProfileData] = useState({})
    const [profileEditData, setProfileEditData] = useState({})
    const [profileDataView, setProfileDataView] = useState({})
    const [isModalAddOpen, OpenAddModal] = useState(false);
    const [isModalEditOpen, OpenEditModal] = useState(false);
    const [changeIndex, setChangeIndex] = useState(1);
    const [filter, setFilter] = useState('');

    useEffect(()=>{
        fetch('User/GetAll').then(res => res.json()).then(json => {
            setProfileData({data:json, columns:[{key:'id', value:'Id'},{key:'email', value:'Email'},{key:'fullName', value:'ФИО'}],
            setData:[{ execute:(i)=>deleteProfile(i),title:'Удалить'},
            { execute:(i)=>editProfile(i),title:'Изменить'}]});
        });
        
    },[])

    useEffect(()=>{
        profileEditData&&profileEditData.id&&OpenEditModal(true);
    },[profileEditData]);
    useEffect(()=>{
        filter && filter!=''
        ? setProfileDataView({...profileData,data:profileData?.data?.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()))})
        : setProfileDataView(profileData);
    },[filter]);


    useEffect(()=>{
        setProfileDataView({...profileData,setData:[{ execute:(i)=>deleteProfile(i),title:'Удалить'},
        { execute:(i)=>editProfile(i),title:'Изменить'}]});

    },[profileData,changeIndex]);


function deleteProfile(i){
    if(window.confirm(`Удалить пользователя ${i.email}`)){

        fetch(`User/Delete`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: i.id
           }).then(res=>{
               if(!res?.ok){
                   return;
               }
            let toDelete = profileData?.data?.filter(f => f.id == i.id)[0]
            let index = profileData?.data?.indexOf(toDelete);
            let newData = profileData.data;
            newData.splice(index,1);
            setProfileData({...profileData,data: newData});
            setChangeIndex(changeIndex+1)

           });
 
    }
    
}
function editProfile(i){
    setProfileEditData(i);
    
}

function profileAdded(d){

    let formData = new FormData();
    formData.append('file', d.avatar || null);
    formData.append('email', d.email);
    formData.append('login', d.login);
    formData.append('password', d.password);
    formData.append('fullName', d.fullName || '');
    formData.append('city', d.city || '');
    formData.append('bio', d.bio || '');
    
    fetch(`User/Create`, {
        method: 'post',
        body:formData
        
       }).then(r => {
           if(!r.ok){
               return;
           }
        const nextId = profileData?.data?.length>0 ? Math.max(...profileData?.data?.map(item => item.id)) +1: 1;
        let newItem = {...d,id:nextId};
        let newData = [...profileData.data, newItem]
        setProfileData({...profileData,data: newData});
       });

    
}
function profileEdited(d){
    let formData = new FormData();
    formData.append('id', profileEditData.id);
    formData.append('file', d.avatar);
    formData.append('email', d.email);
    formData.append('login', d.login);
    formData.append('password', d.password);
    formData.append('fullName', d.fullName);
    formData.append('city', d.city);
    formData.append('bio', d.bio);


    fetch(`User/Edit`, {
        method: 'post',
        body:formData
        
       }).then(r => {
        if(!r.ok){
            return;
        }
    let newArr = profileData?.data;
    let toEdit = newArr?.filter(f => f.id == profileEditData.id)[0]
    let index = newArr?.indexOf(toEdit);
    let newData = {...newArr[index],...d};
    newArr[index] = newData;
    setProfileData({...profileData,data: newArr});
    });
}
  
    return(<div>
        <div><input onChange={(e)=>setFilter(e.target.value)}></input><a onClick={()=>OpenAddModal(true)}>Добавить пользователя</a></div>
    {Table(profileDataView)}
    <AddProfileModal submit ={profileAdded} cancel={() => { OpenAddModal(false) }} isOpen={isModalAddOpen} />
    <AddProfileModal submit ={profileEdited} cancel={() => { OpenEditModal(false) }} isOpen={isModalEditOpen} preValue ={profileEditData}/>
    </div>
    )
}