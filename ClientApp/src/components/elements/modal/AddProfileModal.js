import React, { useState } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function AddProfileModal(props) {
    const [profileData, setProfileData] = useState({})

    const [buttonDisable, setButtonDisable] = useState(false)

    const handleChange = (e)=>{
        const newData = profileData;
        newData[e.target.getAttribute('id')] = e.target.value;
        setProfileData(newData) ;
    }
    const handleLoadFile = (e)=>{
        const newData = profileData;
        
        //const formData = new FormData();
		//formData.append('File', e.target.files[0]);

        newData[e.target.getAttribute('id')] = e.target.files[0]
        setProfileData(newData) ;
    }
    const submit = () => {
        setButtonDisable(true);
        //Post('api/Main/InsertUser', { Title: inputTitle, Login: inputLogin, Pass: inputPass, Name: inputName, LastName: inputLastName, Email: inputEmail })
        //    .then(res => {
        //        if (res.ok)
        //            props.cancel();
        //        else
        //            alert("error InsertUser");

        //        setButtonDisable(false);
        //    })
            setButtonDisable(false)
            props.submit(profileData);
            props.cancel();
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
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Email" id='login' defaultValue={props?.preValue?.login} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Email" id='password' defaultValue={props?.preValue?.password} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="ФИО" id='fullName' defaultValue={props?.preValue?.fullName} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Город" id='city' defaultValue={props?.preValue?.city} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="О себе" id='bio' defaultValue={props?.preValue?.bio} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="file" placeholder="Фото" id='avatar' defaultValue={props?.preValue?.avatar} onChange={handleLoadFile} />

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={props.cancel}>Cancel</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={submit}>Save</button>
                </div>
            </Modal>
        </div>
    );
}