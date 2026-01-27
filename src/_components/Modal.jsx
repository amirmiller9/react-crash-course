'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import classes from './Modal.module.css';

function Modal({ children }) {
  const router = useRouter();
  const dialogRef = useRef();

  useEffect(() => {
    if (!dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  function closeHandler() {
    router.back();
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog
        ref={dialogRef}
        className={classes.modal}
        onClose={closeHandler}
      >
        {children}
      </dialog>
    </>
  );
}

export default Modal;
