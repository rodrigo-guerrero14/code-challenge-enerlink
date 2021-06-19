import React from 'react'
import {createPortal} from 'react-dom'

import '../../styles/modal.css'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({ modalActive, setModal, children }) => {

  return modalActive ? createPortal(
    <section className="modal">
      <div className="modal-content">
        <header className="header">
          <h3>Agendar carga</h3>
          <AiOutlineClose onClick={() => setModal(false)}/>
        </header>
        {children}
      </div>
    </section>,
    document.getElementById('modal')
  ) : null
}

export default Modal