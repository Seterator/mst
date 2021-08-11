import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function EditNominationModal(props) {
    const [nominationData, setNominationData] = useState('')

    const [buttonDisable, setButtonDisable] = useState(false)
    useEffect(()=>{
        setNominationData(props?.preValue);
    },[])

    const handleChange = (e)=>{
        setNominationData({...props?.preValue,name:e.target.value});
    }
    const submit = () => {

            props.submit(nominationData);
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
                <h2>Изменение номинации</h2>

                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Название" defaultValue={props?.preValue?.name} onChange={handleChange} />

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={props.cancel}>Cancel</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={submit}>Save</button>
                </div>
            </Modal>
        </div>
    );
}