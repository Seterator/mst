import React, { useEffect, useState } from 'react';
import { WarningMessage } from '../../elements/MessageElements'

import '../../../style/_label.scss'
import '../../../style/staff.scss'

export function ProfileEdit(){

    const [data, setData] = useState({});
    const [password, setPassword] = useState({});
    let userId = -1;
    const testData = {name:'Лиса Лисичка', email:'lisa@mail.ru', phone:'+7(926)3225233', city:'г.Таганрог', other:'пью фодку, плаваю на лодке'}
    useEffect(()=>{
        //fetch(`getUserData/${userId}`).then(res => res.json()).then(json => setData(json));
        setData(testData);
        userId = localStorage.getItem('userIdMst');


    }, []);

    const handleChangeMail = (e) =>{
        setData({...data,email:e.target.value});
    } 
    const handleChangePhone = (e) =>{
        setData({...data,phone:e.target.value});
    } 
    const handleChangeCity = (e) =>{
        setData({...data,city:e.target.value});
    } 
    const handleChangeOther = (e) =>{
        setData({...data,other:e.target.value});
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
        //fetch(`/profileEdit/${userId}`, {
        //    method: 'post',
        //    headers: {'Content-Type':'application/json'},
        //    body: {
        //     "data": JSON.stringify(data)
        //    }
        //   });

           alert(JSON.stringify(data));

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

        fetch(`/profileEdit/${userId}/changePass`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: {
             "password": password.new
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
                            <img height="352px" width="282px" src="https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200" alt=""/>
                            <h3 className="name">{data.name}</h3>
                        </div>
                        <div className="content" style={{display:'grid'}}>
                            <input onChange={handleChangeMail} className="profile" placeholder="Электронная почта" defaultValue={data.email}/>
                            <input onChange={handleChangePhone} className="profile" placeholder="Телефон" defaultValue={data.phone}/>
                            <input onChange={handleChangeCity} className="profile" placeholder="Город" defaultValue={data.city}/>
                            <textarea  onChange={handleChangeOther} className="profile" placeholder="О себе" defaultValue={data.other}/>
                            <button onClick={()=>AskModeration()}>Запросить модерацию</button>
                            <h3 style={{opacity:'0.25',textAlign: 'center'}}>Изменить пароль</h3>
                            <input onChange={handleChangeOldPass} className="profile" placeholder="Старый пароль"/>
                            <hr/>
                            <input type='password' onChange={handleChangeNewPass} className="profile" placeholder="Новый пароль"/>
                            <input type='password' onChange={handleChangeConfirmPass} className="profile" placeholder="Подтверждение"/>
                            <button onClick={()=>ChangePass()}>Изменить</button>
                        </div>
                        <div className="content">
                            {WarningMessage('В рамках спецификации современных стандартов, действия представителей оппозиции являются только методом политического участия и представлены в исключительно положительном свете. Безусловно, постоянный количественный рост и сфера нашей активности в значительной степени обусловливает важность позиций, занимаемых участниками в отношении поставленных задач. Не следует, однако, забывать, что сплочённость команды профессионалов влечет за собой процесс внедрения и модернизации вывода текущих активов.', '390px')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}