import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import Moment from 'moment'


Modal.setAppElement('#root')

export default function AddCompetitionModal(props) {
    const [profileData, setProfileData] = useState({})

    const [buttonDisable, setButtonDisable] = useState(false)

    useEffect(()=>{
        props?.preValue&&setProfileData(props.preValue)
    },[props])
    const handleChange = (e)=>{
        const newData = profileData;
        newData[e.target.getAttribute('id')] = e.target.value;
        setProfileData(newData) ;
    }
    const submit = () => {
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
                <div style={{display:'grid', padding:'20px', backgroundColor: '#2B111B', overflowX:'auto', maxHeight:'500px'}}> 
                <h2>Создание конкурса</h2>

                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Название" id='name' defaultValue={props?.preValue?.name} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Ссылка" id='link' defaultValue={props?.preValue?.link} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="date" placeholder="Дата начала" id='beginDate' defaultValue={Moment(props?.preValue?.beginDate).format('yyyy-MM-DD')} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="date" placeholder="Дата окончания" id='endDate' defaultValue={Moment(props?.preValue?.endDate).format('yyyy-MM-DD')} onChange={handleChange} />

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={props.cancel}>Cancel</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={submit}>Save</button>
                </div>
            </Modal>
        </div>
    );
}