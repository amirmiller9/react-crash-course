'use client';

import { useRouter } from 'next/navigation';
import classes from './Modal.module.css';

function Modal({ children }) {
  const router = useRouter();

  function closeHandler() {
    router.back();
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
