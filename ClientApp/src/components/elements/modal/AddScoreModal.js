import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'

Modal.setAppElement('#root')

export default function AddScoreModal(props){
    const {isOpen, preValue, cancel, submit, editedShow} = props;

    const [inputVal, setInputVal] = useState();

    useEffect(()=>{
        setInputVal(preValue);

    },[preValue])

    function handleChange(e){
        let val = e.target.value;

        if((Number.parseInt(val) > 0)||val==''){
            setInputVal(Number.parseInt(val));
        }
        else{
            e.target.value = '';
        }

    }

    const submitModal = () => {
        submit({editedShow:editedShow, score:inputVal});
        cancel();
        setInputVal();
    }

    const cancelModal = () => {
        cancel();
        setInputVal();
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
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
            >
                <div style={{display:'grid', padding:'20px', backgroundColor: '#2B111B', overflowX:'auto', maxHeight:'500px'}}> 
                <h2>Создание конкурса</h2>

                <input style={{margin:'10px 0', height:'55px'}} type="number" placeholder="Место" value={inputVal} onChange={handleChange} />

                <button style={{margin:'10px 0', height:'55px'}} onClick={cancelModal}>Cancel</button>
                <button style={{margin:'10px 0', height:'55px'}} onClick={submitModal}>Save</button>
                </div>
            </Modal>
        </div>
    );

}