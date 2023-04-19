import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import AuthInputBoxes from './AuthInputBoxes';

const LogIn = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [navigate, user]);

  const logIn = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/main');
      })
      .catch((err0r) => {
        console.log(err0r);
        navigate('/error');
      });
  };

  return (
    <>
      {!user && (
        <div className='log_in__container grid-container-center max-width width-100 text-center'>
          <form onSubmit={logIn}>
            <h1>Log In - Log in to your account</h1>
            <AuthInputBoxes
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
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
    </>
  );
};

export default LogIn;
