import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function SetShowNominationModal(props) {
    const [showNominationsData, setShowNominationsData] = useState([])
    const [nominationsData, setNominationsData] = useState([])

    const [buttonDisable, setButtonDisable] = useState(false)

    const {isOpen, showNominations, setShowNominations, cancel, nominations} = props;

    useEffect(()=>{
        setShowNominationsData(showNominations);
        setNominationsData(nominations);

    },[showNominations])
    const handleChange = (val,id)=>{
        const newData = showNominationsData;
        let i = newData.indexOf(newData.filter(f=>f.id == id)[0]);
        if(i>-1){
            newData[newData.indexOf(newData.filter(f=>f.id == id)[0])].value = val;
        }
        else{
            newData.push({id:id, value:val});
        }

        

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
                {nominationsData?.map((v,i)=>{
                    let values = showNominations.filter(f=>f.id == v.id).map(m=>m.value);
                    let val = values.length>0 ? values[0] : '';
                    return(
                    <div>
                    <label>{v.name}</label>
                    <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Номинант" id={v.name} defaultValue={val} onChange={(e)=>handleChange(e.target.value,v.id)} />
                    </div>)
                })}

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={handleSubmit}>Ок</button>
                </div>
            </Modal>
        </div>
    );
}