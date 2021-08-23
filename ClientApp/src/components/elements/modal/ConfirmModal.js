import React from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function ConfirmModal(props) {

    const {style, isOpen, cancel, save, title, content, cancelTitle, saveTitle } = props;

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
            className="modal-area"
                isOpen={isOpen}
                style={style?.area}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
            >
                <div style={style?.container} className="modal-container"> 
                <div style={style?.title} className="modal-title">{title}</div>
                {content}

                <div  style={style?.btnContainer} className="modal-btn-container">
                {cancelTitle && <button style={style?.cancel} className="modal-cancel-btn" onClick={cancel}>{cancelTitle}</button>}
                <button style={style?.ok} className="modal-ok-btn" onClick={save}>{saveTitle}</button>
                </div>
                </div>
            </Modal>
        </div>
    );
}