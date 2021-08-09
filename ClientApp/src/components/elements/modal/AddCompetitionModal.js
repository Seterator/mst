import React, { useState } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function AddCompetitionModal(props) {
    const [profileData, setProfileData] = useState({})

    const [buttonDisable, setButtonDisable] = useState(false)

    const handleChange = (e)=>{
        const newData = profileData;
        newData[e.target.getAttribute('id')] = e.target.value;
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

                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Название" id='title' defaultValue={props?.preValue?.title} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Ссылка" id='url' defaultValue={props?.preValue?.url} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Дата начала" id='startDate' defaultValue={props?.preValue?.startDate} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Дата окончания" id='endDate' defaultValue={props?.preValue?.endDate} onChange={handleChange} />

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={props.cancel}>Cancel</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={submit}>Save</button>
                </div>
            </Modal>
        </div>
    );
}