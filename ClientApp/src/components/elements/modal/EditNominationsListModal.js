import React, { useState } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function EditNominationsListModal(props) {
    const [nominationData, setNominationData] = useState('')

    const [buttonDisable, setButtonDisable] = useState(false)

    function add(){
        if(nominationData!=''){
            props.add({competitionId:props.competitionId, name:nominationData});
            setNominationData('');

        }
    }
    function cancel(){
        setNominationData('');
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
                <h2>Номинации</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props?.nominations&& props?.nominations?.map((m,i)=>{
                            return(<tr>
                                <td>{m?.name}</td>
                                <td><a onClick={(e)=>props.delete(i)}>Удалить</a><a onClick={(e)=>props.edit(m,i)}>Изменить</a></td>
                            </tr>)
                        })}

                    </tbody>
                </table>

                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Название" id='title' value={nominationData} onChange={(e)=>setNominationData(e.target.value)} />

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={cancel}>Закрыть</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={add}>Добавить</button>
                </div>
            </Modal>
        </div>
    );
}