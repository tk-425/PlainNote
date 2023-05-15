import './styles/ResetPassword.css';
import { auth } from '../../utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const resetPassword = async () => {
    await sendPasswordResetEmail(auth, email);
    navigate('/login');
  };

  return (
    <div className='reset_password__container flex item-center max-width width-100'>
      <div className='reset_password__contents flex item-center'>
        <div className='form__contents flex flex-col item-center'>
          <h1 className='form__h1'>Reset Password</h1>
          <div className='reset__messages'>
            <blockquote>
              Please enter your email address.
              You will receive a link to create a new password via email.
            </blockquote>
          </div>
          <input
            className='form__input'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email address'
          />
          <button
            className='form__button'
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
