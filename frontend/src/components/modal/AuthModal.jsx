import './styles/Modal.css';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ msg, navigateTo, reload }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);

    if (navigateTo) {
      navigate(`${navigateTo}`);
    }
    
    if (reload) {
      window.location.reload(false);
    }
  };

  return (
    <Popup
      open={open}
      onClose={closeModal}
      closeOnDocumentClick
    >
      <div className='modal__contents flex item-center'>
        <span>{msg}</span>
        <button className='editor-button' onClick={closeModal}>&times;</button>
      </div>
    </Popup>
  );
};

export default AuthModal;
