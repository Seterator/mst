import React, { useState } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function AddProfileModal(props) {
    const [inputTitle, setInputTitle] = useState('')
    const [inputLogin, setInputLogin] = useState('')
    const [inputPass, setInputPass] = useState('')
    const [inputName, setInputName] = useState('')
    const [inputLastName, setInputLastName] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [buttonDisable, setButtonDisable] = useState(false)

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
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
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
                <h2>Создание пользователя</h2>

                <input type="text" placeholder="inputTitle" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
                <input type="text" placeholder="inputLogin" value={inputLogin} onChange={(e) => setInputLogin(e.target.value)} />
                <input type="text" placeholder="inputPass" value={inputPass} onChange={(e) => setInputPass(e.target.value)} />
                <input type="text" placeholder="inputName" value={inputName} onChange={(e) => setInputName(e.target.value)} />
                <input type="text" placeholder="inputLastName" value={inputLastName} onChange={(e) => setInputLastName(e.target.value)} />
                <input type="text" placeholder="inputEmail" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />

                <button disabled={buttonDisable} onClick={props.cancel}>Cancel</button>
                <button disabled={buttonDisable} onClick={submit}>Save</button>

            </Modal>
        </div>
    );
}