import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function AddProfileModal(props) {
    const [profileData, setProfileData] = useState({})

    const [buttonDisable, setButtonDisable] = useState(false)

    useEffect(()=>{
        props?.preValue&& setProfileData(props?.preValue);
    },[]);
    const handleChange = (e)=>{
        if(profileData){

        const newData = profileData;
        newData[e.target.getAttribute('id')] = e.target.value;
        setProfileData(newData) ;
        }
    }
    const handleLoadFile = (e)=>{
        if(profileData){
        const newData = profileData;

        newData[e.target.getAttribute('id')] = e.target.files[0]
        setProfileData(newData);
        }
    }
    const handleValidation = () =>{
        return profileData.email 
        &&profileData.login 
        &&profileData.password 
        &&profileData.fullName 
        &&profileData.city 
        &&profileData.bio 
        &&profileData.avatar 
        
    }
    const submit = () => {
        if(handleValidation()){
            props.submit(profileData);
            props.cancel();
        }
        else{
            alert('Необходимо заполнить все поля')
        }
 
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '5px solid black',
            backgroundColor: '#2B111B'
        }
    };

    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
            >
                <div style={{display:'grid', padding:'20px', backgroundColor: '#2B111B'}}> 
                <h2>Создание пользователя</h2>

                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Email" id='email' defaultValue={props?.preValue?.email} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Логин" id='login' defaultValue={props?.preValue?.login} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Пароль" id='password' defaultValue={props?.preValue?.password} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="ФИО" id='fullName' defaultValue={props?.preValue?.fullName} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Город" id='city' defaultValue={props?.preValue?.city} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="О себе" id='bio' defaultValue={props?.preValue?.bio} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="file" placeholder="Фото" id='avatar' onChange={handleLoadFile} />

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={props.cancel}>Cancel</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={submit}>Save</button>
                </div>
            </Modal>
        </div>
    );
}