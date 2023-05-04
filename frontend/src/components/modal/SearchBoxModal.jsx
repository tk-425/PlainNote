import Popup from 'reactjs-popup';
import './styles/Modal.css';
import { useState } from 'react';

const SearchBoxModal = () => {
  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Popup
      open={open}
      onClick={closeModal}
      closeOnDocumentClick
    >
      <div className='modal__contents'>
        <span>Longer than 3 characters.</span>
        <button onClick={closeModal}>&times;</button>
      </div>
    </Popup>
  );
};

export default SearchBoxModal;
