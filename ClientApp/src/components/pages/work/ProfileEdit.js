import React, { useEffect, useState, useContext } from 'react';
import { WarningMessage } from '../../elements/MessageElements'
import {UserContext } from '../../../LoginMiddleware'

import '../../../style/_label.scss'
import '../../../style/staff.scss'

export function ProfileEdit(){

    const [data, setData] = useState({});
    const [avatarView, setAvatarView] = useState({});
    const [password, setPassword] = useState({});
    const {user} = useContext(UserContext);

    useEffect(()=>{

        if(user.id>0){
            fetch(`User/GetById?id=${user.id}`)
            .then(r=>r.json())
            .then(res => {

                setData(res);
                setAvatarView(`data:image/png;base64,${res.avatar}`);
            });
        }
        

    }, []);

    const handleChange = (e)=>{
        const newData = data;
        newData[e.target.getAttribute('id')] = e.target.value;
        setData(newData) ;
    }

    const handleLoadFile = (e)=>{

        function getBase64(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setAvatarView( reader.result);
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
         }
         getBase64(e.target.files[0]);
         //setAvatarView(`data:image/png;base64,${getBase64(e.target.files[0])}`);

        const newData = data;

        newData[e.target.getAttribute('id')] = e.target.files[0]
        setData(newData) ;
    }

    const handleChangeOldPass = (e) =>{
        setPassword({...password,old:e.target.value});
    } 
    const handleChangeNewPass = (e) =>{
        setPassword({...password,new:e.target.value});
    } 
    const handleChangeConfirmPass = (e) =>{
        setPassword({...password,confirm:e.target.value});
    } 

    const AskModeration = () =>{
        let formData = new FormData();
    formData.append('id', user.id);
    formData.append('file', data.avatar);
    formData.append('email', data.email);
    formData.append('fullName', data.fullName);
    formData.append('city', data.city);
    formData.append('bio', data.bio);


    fetch(`User/Edit`, {
        method: 'post',
        body:formData
        
       }).then(r => {
        if(!r.ok){
            return;
        }
        return r.json();
        })
        .then(res=>{
            setData(res);
            setAvatarView(`data:image/png;base64,${res.avatar}`);
        });
    } 

    const ChangePass = () =>{

        if(password.new != password.confirm){
            alert('пароли не совпадают');
            return;
        }
        const oldPass = localStorage.getItem('passwordMst');
        if(oldPass !== password.old){
            alert('Старый пароль не верный');
            return;
        }

        const bodyData = {id:user.id, login:user.login, email:data.email,oldPassword:password.old, newPassword:password.new};
        fetch(`User/ChangePassword`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify( bodyData)
           }).then(res => {
               if(res.ok){
                   setPassword({});
                alert('Пароль успешно изменен');

               }
               else{
                alert('Ошибка изменения пароля');
               }
            })
    }
    return(
        <section className="section section-content">
            <div className="container">
                <div className="nav-content president">
                    <h2 className="nav-content-title">Изменение данных</h2>
                    <div className="twoCol">
                        <div className="about">
                            <img style={{height:'465px', width:'390px'}}  src={avatarView} alt=""/>
                            <h3 className="name">{data.name}</h3>
                            <input type="file" id="avatar" onChange={handleLoadFile} placeholder="Обновить фото"></input>
                        </div>
                        <div className="content" style={{display:'grid'}}>
                            <input onChange={handleChange} className="profile" id="email" placeholder="Электронная почта" defaultValue={data.email}/>
                            <input onChange={handleChange} className="profile" id="fullName" placeholder="ФИО" defaultValue={data.fullName}/>
                            <input onChange={handleChange} className="profile" id="city" placeholder="Город" defaultValue={data.city}/>
                            <textarea  onChange={handleChange} className="profile" id="bio" placeholder="О себе" defaultValue={data.bio}/>
                            <button onClick={()=>AskModeration()}>Запросить модерацию</button>
                            <h3 style={{opacity:'0.25',textAlign: 'center'}}>Изменить пароль</h3>
                            <input onChange={handleChangeOldPass} value={password?.old} className="profile" placeholder="Старый пароль"/>
                            <hr/>
                            <input type='password' onChange={handleChangeNewPass} value={password?.new} className="profile" placeholder="Новый пароль"/>
                            <input type='password' onChange={handleChangeConfirmPass} value={password?.confirm} className="profile" placeholder="Подтверждение"/>
                            <button onClick={()=>ChangePass()}>Изменить</button>
                        </div>
                        <div className="content">
                            {WarningMessage('В рамках спецификации современных стандартов, действия представителей оппозиции являются только методом политического участия и представлены в исключительно положительном свете. Безусловно, постоянный количественный рост и сфера нашей активности в значительной степени обусловливает важность позиций, занимаемых участниками в отношении поставленных задач. Не следует, однако, забывать, что сплочённость команды профессионалов влечет за собой процесс внедрения и модернизации вывода текущих активов.', 'profile-warn')}
                            {WarningMessage('В рамках спецификации современных стандартов, действия представителей оппозиции являются только методом политического участия и представлены в исключительно положительном свете. Безусловно, постоянный количественный рост и сфера нашей активности в значительной степени обусловливает важность позиций, занимаемых участниками в отношении поставленных задач. Не следует, однако, забывать, что сплочённость команды профессионалов влечет за собой процесс внедрения и модернизации вывода текущих активов.', 'profile-warn opacity margin-top')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}