import React, { useEffect, useState } from 'react';
import Table from '../misc/Table';
import AddProfileModal from '../modal/AddProfileModal'

export function ProfileListView(){

    const [profileData, setProfileData] = useState({})
    const [isModalOpen, OpenModal] = useState(false);

    useEffect(()=>{
        setProfileData(testData);
    },[])

    const testData = {columns:[{key:'id', value:'Id'},{key:'email', value:'Email'},{key:'name', value:'ФИО'},{key:'city', value:'Город'},{key:'phone', value:'Телефон'},{key:'other', value:'О себе'}, {key:'role', value:'Роль'}, {key:'image', value:'Фото'}],
data:[{ id: 5,image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200', name: 'Лиса Лисичкова', email:'lisa@mail.ru', role:'Admin', city:'г.Таганрог', phone:'+7(111)11111111',other:'пью виски, кушаю сосиски' },
{ id: 6,image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200', name: 'Лиза Лисичкова', email:'lisa1@mail.ru', role:'Member', city:'г.Таганрог', phone:'+7(111)11111112',other:'пью колу, кушаю ролы' }
],
setData:[{execute:(i)=>addProfile(i),title:'Добавить'},
{ execute:(i)=>deleteProfile(i),title:'Удалить'},
{ execute:(i)=>editProfile(i),title:'Изменить'}]};
const addProfile = (i)=>OpenModal(true);
const deleteProfile = (i)=>alert(`deleteProfile ${JSON.stringify(i)}`);
const editProfile = (i)=>OpenModal(true);
  
    return(<div>{Table(profileData)}
    <AddProfileModal cancel={() => { OpenModal(false) }} isOpen={isModalOpen} /></div>)
}