import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function SetShowNominationModal(props) {
    const [showNominationsData, setShowNominationsData] = useState([])

    const [buttonDisable, setButtonDisable] = useState(false)

    const {isOpen, showNominations, setShowNominations, cancel} = props;

    useEffect(()=>{
        setShowNominationsData(showNominations);

    },[showNominations])
    const handleChange = (val,index)=>{
        const newData = showNominationsData;
        
        newData[index].value = val;

        setShowNominationsData(newData) ;
    }
    const handleSubmit = () => {
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
            setShowNominations(showNominationsData);
            cancel();
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
                <div style={{display:'grid', padding:'20px', backgroundColor: '#2B111B'}}> 
                <h2>Назначение номинаций</h2>
                {showNominationsData?.map((v,i)=>{
                    return(
                    <div>
                    <label>{v.title}</label>
                    <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Номинант" id={v.title} defaultValue={v.value} onChange={(e)=>handleChange(e.target.value,i)} />
                    </div>)
                })}

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={handleSubmit}>Ок</button>
                </div>
            </Modal>
        </div>
    );
}