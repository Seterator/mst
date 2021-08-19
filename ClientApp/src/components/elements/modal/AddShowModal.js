import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function AddShowModal(props) {
    const [showData, setShowData] = useState({})

    const [buttonDisable, setButtonDisable] = useState(false)

    useEffect(()=>{
        props?.preValue&&setShowData(props?.preValue)

    },[props])
    const handleChange = (e)=>{
        const newData = showData;
        newData[e.target.getAttribute('id')] = e.target.value;
        setShowData(newData) ;
    }
    const handleLoadFile = (e)=>{
        const newData = showData;

        newData[e.target.getAttribute('id')] = e.target.files[0]
        setShowData(newData) ;
    }

    const handleValidation = () =>{
        return showData.name 
        &&showData.description 
        &&showData.shortDescription 
        &&showData.webLink 
        &&showData.videoLink 
        && (showData.image  ||props?.preValue)
        
    }
    const submit = () => {

        if(handleValidation()){
            props.submit(showData);
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
                <h2>Создание/изменение спектакля</h2>

                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Название" id='name' defaultValue={props?.preValue?.name} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Описание" id='description' defaultValue={props?.preValue?.description} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Короткое описание" id='shortDescription' defaultValue={props?.preValue?.shortDescription} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Ссылка" id='webLink' defaultValue={props?.preValue?.webLink} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Видео" id='videoLink' defaultValue={props?.preValue?.videoLink} onChange={handleChange} />
                <input style={{margin:'10px 0', height:'55px'}} type="file" placeholder="Фото" id='image' onChange={handleLoadFile} />

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={props.cancel}>Cancel</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={submit}>Save</button>
                </div>
            </Modal>
        </div>
    );
}