import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import AuthInputBoxes from './AuthInputBoxes';
import AuthModal from '../modal/AuthModal';
import authUtils from './auth-utils';

const SignUp = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [signUpError, setSignUpError] = useState(false);
  const [msg, setMsg] = useState('');
  const [navigateTo, setNavigateTo] = useState('');
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/main');
  }, [navigate, user, signUpError]);

  const signUp = async (e) => {
    e.preventDefault();

    await authUtils.signUp({
      setSignUpError,
      password,
      passwordVerify,
      createUserWithEmailAndPassword,
      auth,
      email,
      navigate,
      setMsg,
      setNavigateTo,
      setPassword,
      setPasswordVerify,
      setReload,
    });
  };

  return (
    <>
      {!user && !signUpError && (
        <div className='sign_in__container grid-container-center max-width width-100 text-center'>
          <form onSubmit={signUp}>
            <h1>Sign Up - Create your account</h1>
            <AuthInputBoxes
              email={email}
              password={password}
              passwordVerify={passwordVerify}
              setEmail={setEmail}
              setPassword={setPassword}
              setPasswordVerify={setPasswordVerify}
              secondInputBox={true}
            />
            <button type='submit'>Sign Up</button>
          </form>
          <div>
            <Link to='/login'>Log In</Link>
          </div>
        </div>
      )}
      {signUpError && (
        <AuthModal
          msg={msg}
          navigateTo={navigateTo}
          reload={reload}
        />
      )}
    </>
  );
};

export default SignUp;
