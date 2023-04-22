import './Modal.css';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';

const Modal = ({ msg, navigateTo }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const closeModal = () => {
    setOpen(false);
    navigate(`${navigateTo}`);
  };

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
    >
      <div className='modal__contents'>
        <span>{msg}</span>
        <button onClick={closeModal}>&times;</button>
      </div>
    </Popup>
  );
};

export default Modal;
