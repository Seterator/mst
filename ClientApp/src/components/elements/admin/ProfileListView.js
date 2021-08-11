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
        setProfileData(testData);
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

    const testData = {columns:[{key:'id', value:'Id'},{key:'email', value:'Email'},{key:'name', value:'ФИО'}],
data:[{ id: 5,image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200', name: 'Лиса Лисичкова', email:'lisa@mail.ru', city:'г.Таганрог',bio:'пью виски, кушаю сосиски' },
{ id: 6,image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200', name: 'Лиза Лисичкова', email:'lisa1@mail.ru', city:'г.Таганрог', bio:'пью колу, кушаю ролы' }
],
setData:[
{ execute:(i)=>deleteProfile(i),title:'Удалить'},
{ execute:(i)=>editProfile(i),title:'Изменить'}]};

function deleteProfile(i){
    if(window.confirm(`Удалить пользователя ${i.email}`)){
        let toDelete = profileData?.data?.filter(f => f.id == i.id)[0]
        let index = profileData?.data?.indexOf(toDelete);
        let newData = profileData.data;
        newData.splice(index,1);
        setProfileData({...profileData,data: newData});
        setChangeIndex(changeIndex+1)
    }
    
}
function editProfile(i){
    setProfileEditData(i);
    
}

function profileAdded(d){
    const nextId = profileData?.data?.length>0 ? Math.max(...profileData?.data?.map(item => item.id)) +1: 1;
    let newItem = {...d,id:nextId};
    let newData = [...profileData.data, newItem]
    setProfileData({...profileData,data: newData});
}
function profileEdited(d){
    let newArr = profileData?.data;
    let toEdit = newArr?.filter(f => f.id == profileEditData.id)[0]
    let index = newArr?.indexOf(toEdit);
    let newData = {...newArr[index],...d};
    newArr[index] = newData;
    setProfileData({...profileData,data: newArr});
}
  
    return(<div>
        <div><input onChange={(e)=>setFilter(e.target.value)}></input><a onClick={()=>OpenAddModal(true)}>Добавить пользователя</a></div>
        

    {Table(profileDataView)}
    <AddProfileModal submit ={profileAdded} cancel={() => { OpenAddModal(false) }} isOpen={isModalAddOpen} />
    <AddProfileModal submit ={profileEdited} cancel={() => { OpenEditModal(false) }} isOpen={isModalEditOpen} preValue ={profileEditData}/>
    </div>
    )
}