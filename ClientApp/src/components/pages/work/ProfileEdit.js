import React, { useEffect, useState, useContext } from 'react';
import { WarningMessage } from '../../elements/MessageElements'
import {UserContext } from '../../../LoginMiddleware';
import {ModalConfirmContext} from '../../Layout'

import '../../../style/_label.scss'
import '../../../style/staff.scss'

export function ProfileEdit(){

    const [data, setData] = useState({});
    const [avatarView, setAvatarView] = useState({});
    const [password, setPassword] = useState({});
    const {user} = useContext(UserContext);
    const { setModalOpen, setConfirmModal } = useContext(ModalConfirmContext);

    useEffect(()=>{

        if(user.id>0){
            fetch(`User/GetById?id=${user.id}`)
            .then(r=>r.json())
            .then(res => {

                if(res){
                    setData(res);
                    setAvatarView(`data:image/png;base64,${res.avatar}`);
                }
                
            });
        }
        

    }, [user]);

    function confirm(content, title){
        

            setConfirmModal({
                title: title||"Предупреждение!",
                content: (<div className="modal-warn" style={{width:'auto'}}>{content}</div>),
                saveTitle: "Ок",
                save: () => {
                    setModalOpen(false);
                },
                style:{title:{}, area:{content:{width:'auto', height:'auto'}}}
            });
       
        
    }

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

    const AskModeration = async () =>{
        let formData = new FormData();
    formData.append('id', user.id);
    formData.append('file', data.avatar);
    formData.append('email', data.email);
    formData.append('fullName', data.fullName);
    formData.append('city', data.city);
    formData.append('bio', data.bio);


    var r = await fetch(`User/Edit`, {
        method: 'post',
        body:formData
        
       });

       if(r.ok){
        confirm('Данные успешно изменены', 'Информация');
    } 

    } 

    const ChangePass = () =>{

        if(password.new != password.confirm){
            confirm('Пароли не совпадают');
            return;
        }
        const oldPass = localStorage.getItem('passwordMst');
        if(oldPass !== password.old){
            confirm('Старый пароль не верный');
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
                   confirm('Пароль успешно изменен');

               }
               else{
                confirm('Ошибка изменения пароля');
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
                            <div style={{backgroundImage:`url(${avatarView})`, 
                            width:'390px', height:'465px', backgroundSize: 'auto 100%',
                            backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
                            <div className="file-message">Вы можте загрузить изображения профиля в формате .png или .jpeg</div>
                            <input type="file" id="avatar" onChange={handleLoadFile} placeholder="Обновить фото"></input>
                        </div>
                        <div className="content" style={{display:'grid'}}>
                            <input onChange={handleChange} className="profile" id="email" placeholder="Электронная почта" defaultValue={data?.email}/>
                            <input onChange={handleChange} className="profile" id="fullName" placeholder="Ваше ФИО" defaultValue={data?.fullName}/>
                            <input onChange={handleChange} className="profile" id="city" placeholder="Город" defaultValue={data?.city}/>
                            <textarea  onChange={handleChange} className="profile" id="bio" placeholder="О себе" defaultValue={data?.bio}/>    
                            <button onClick={()=>AskModeration()}>Сохранить изменения</button>
                            <h3 style={{opacity:'0.25',textAlign: 'center'}}>Изменение пароля</h3>
                            <input onChange={handleChangeOldPass} value={password?.old} className="profile" placeholder="Старый пароль"/>
                            <hr/>
                            <input type='password' onChange={handleChangeNewPass} value={password?.new} className="profile" placeholder="Новый пароль"/>
                            <input type='password' onChange={handleChangeConfirmPass} value={password?.confirm} className="profile" placeholder="Подтверждение"/>
                            <button onClick={()=>ChangePass()}>Изменить пароль</button>
                        </div>
                        <div className="content">
                            {WarningMessage('На данной странице вы сможете изменить данные профиля. Заполните адрес электронной почты, полное имя, город и краткую информацию о себе. Вы также можете изменять фото профиля. Вы всегда можете задать вопрос по личному кабинету по почте manager@musicalheart.ru или по номеру 84951158530.', 'profile-warn')}
                            {/*второе предупреждение не нужно, это пример анимации элемента {WarningMessage('В рамках спецификации современных стандартов, действия представителей оппозиции являются только методом политического участия и представлены в исключительно положительном свете. Безусловно, постоянный количественный рост и сфера нашей активности в значительной степени обусловливает важность позиций, занимаемых участниками в отношении поставленных задач. Не следует, однако, забывать, что сплочённость команды профессионалов влечет за собой процесс внедрения и модернизации вывода текущих активов.', 'profile-warn opacity margin-top')} */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
