import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Footer } from './Footer';
import { NavMenu } from './NavMenu';
import ConfirmModal from './elements/modal/ConfirmModal';

export const ModalConfirmContext = React.createContext()

export default function Layout(props) {

    const [confirmModal, setConfirmModal] = useState();
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

    useEffect(() => {
      if (confirmModal && confirmModal.save && confirmModal.content && confirmModal.title) {
          setConfirmModalIsOpen(true);
      }
  }, [confirmModal]);

  useEffect(() => {
      if (!confirmModalIsOpen) {
          setConfirmModal();
      }
  }, [confirmModalIsOpen]);

    return (
      <ModalConfirmContext.Provider value={{
        setModalOpen: setConfirmModalIsOpen,
        setConfirmModal: setConfirmModal
    }} >
      <div style={{display:`${props.display ? 'none':'block'}`}}>
        <NavMenu {...props}/>
        <div>
          {props.children}
        </div>
        <Footer/>
      </div>
      <ConfirmModal style={confirmModal && confirmModal.style} cancel={confirmModal && confirmModal.cancel} isOpen={confirmModalIsOpen} save={confirmModal && confirmModal.save} title={confirmModal && confirmModal.title} content={confirmModal && confirmModal.content} cancelTitle={confirmModal && confirmModal.cancelTitle} saveTitle={confirmModal && confirmModal.saveTitle} />
      </ModalConfirmContext.Provider >
    )
  
}
