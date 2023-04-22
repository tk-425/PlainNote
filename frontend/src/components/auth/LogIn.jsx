import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import AuthInputBoxes from './AuthInputBoxes';
import Modal from './Modal';

const LogIn = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [msg, setMsg] = useState('Wrong password');
  const [navigateTo, setNavigateTo] = useState('');
  const navigate = useNavigate();
  const wrongPasswordError = 'auth/wrong-password';
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
        console.log('signInWithEmailAndPassword');
        console.log(err0r);
        setLoginError(true);

        if (err0r.message.contains(wrongPasswordError)) {
          setMsg('The password is incorrect');
          setNavigateTo('/login');
        } else {
          setMsg('The user does not exist');
          setNavigateTo('/signup');
        }
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
        <Modal
          msg={msg}
          navigateTo={navigateTo}
        />
      )}
    </>
  );
};

export default LogIn;
