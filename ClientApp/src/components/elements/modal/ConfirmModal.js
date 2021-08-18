import React from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function ConfirmModal(props) {

    const {isOpen, text, setResult } = props;

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
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
            >
                <div style={{display:'grid', padding:'20px', backgroundColor: '#2B111B'}}> 
                <h2>{text?.title}</h2>
                <div>{text?.message}</div>

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={()=>setResult(false)}>{text?.cancel}</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={()=>setResult(true)}>{text?.ok}</button>
                </div>
            </Modal>
        </div>
    );
}