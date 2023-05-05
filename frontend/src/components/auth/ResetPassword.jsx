import { auth } from '../../utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const resetPassword = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent');
    navigate('/login');
  };

  return (
    <div className='reset_password__container grid-container-center max-width width-100 text-center'>
      <h1>Reset Your Password</h1>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={resetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
