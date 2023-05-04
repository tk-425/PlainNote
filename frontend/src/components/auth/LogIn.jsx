import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import AuthInputBoxes from './AuthInputBoxes';
import AuthModal from '../modal/AuthModal';
import messages from '../../utils/modalMessages';

const LogIn = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [msg, setMsg] = useState('');
  const [navigateTo, setNavigateTo] = useState('');
  const navigate = useNavigate();
  const wrongPasswordError = messages.wrongPasswordError;
  // const userNotFoundError = 'auth/user-not-found';

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [navigate, user]);

  const logIn = async (e) => {
    e.preventDefault();

    const backendAuthCheck = async (userCredential) => {
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userCredential.user.accessToken}`,
          'Content-Type': 'application/json',
        },
      };

      const url = `http://localhost:8080/api/v1/user`;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Authentication Failed');
      }
    };

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        backendAuthCheck(userCredential);
        setLoginError(false);
        navigate('/main');
      })
      .catch((err0r) => {
        setLoginError(true);

        if (err0r.code === wrongPasswordError) {
          setMsg(messages.incorrectPassword);
          // setNavigateTo('/login');
        } else {
          setMsg(messages.userNotExist);
          setNavigateTo('/signup');
        }

        setEmail('');
        setPassword('');
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
            <Link>Forgot your password</Link>
          </div>
          <div>
            <Link to='/signup'>Sign up</Link>
          </div>
        </div>
      )}
      {loginError && (
        <AuthModal
          msg={msg}
          navigateTo={navigateTo}
        />
      )}
    </>
  );
};

export default LogIn;
