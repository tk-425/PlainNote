import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import AuthInputBoxes from './AuthInputBoxes';
import AuthModal from '../modal/AuthModal';
import authUtils from './auth-utils';
import LoginSignUp from './LoginSignUp';

const LogIn = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [msg, setMsg] = useState('');
  const [navigateTo, setNavigateTo] = useState('');
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/main');
  }, [navigate, user]);

  const logIn = async (e) => {
    e.preventDefault();

    await authUtils.logIn({
      auth,
      email,
      password,
      signInWithEmailAndPassword,
      setLoginError,
      navigate,
      setMsg,
      setReload,
      setNavigateTo,
      setEmail,
      setPassword,
    });
  };

  return (
    <>
      {!user && !loginError && (
        <div className='log_in__container grid-container-center max-width width-100 text-center'>
          <form onSubmit={logIn}>
            <h1>Log In - Log in to your account</h1>
            <AuthInputBoxes
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              secondInputBox={false}
            />
            <button type='submit'>Log In</button>
          </form>
          <div>
            <Link to='/resetPassword'>Forgot your password</Link>
          </div>
          <div className='flex item-center'>
            <Link to='/signup'>Sign up</Link>
          </div>

          {/* NEW LOGIN & SIGNUP */}
          <br /><br />
          <>
            <LoginSignUp />
          </>
        </div>
      )}
      {loginError && (
        <AuthModal
          msg={msg}
          navigateTo={navigateTo}
          reload={reload}
        />
      )}
    </>
  );
};

export default LogIn;
