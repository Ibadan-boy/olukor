import {  useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, onClose, children }) {
  const dialog = useRef();

  useEffect(()=> {
    if(open && dialog.current){
      dialog.current.showModal();
    } else{
      dialog.current.close();
    }
  }, [open])

  

  return createPortal(
    <dialog className="bg-purple-600 p-10 m-auto rounded-lg" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
