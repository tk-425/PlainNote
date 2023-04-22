import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import AuthInputBoxes from './AuthInputBoxes';
import Modal from './Modal';

const SignUp = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [signUpError, setSignUpError] = useState(false);
  const [msg, setMsg] = useState('');
  const [navigateTo, setNavigateTo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [navigate, user, signUpError]);

  const signUp = async (e) => {
    e.preventDefault();

    const backendCreateUser = async (userCredential) => {
      const requestOption = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userCredential.user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userCredential.user.uid,
          email: userCredential.user.email,
        }),
      };

      const url = `http://localhost:8080/api/v1/user`;
      const response = await fetch(url, requestOption);

      if (!response.ok) {
        setSignUpError(true);
        throw new Error('Server Error');
      }

      const data = await response.json();
      setSignUpError(false);

      return data;
    };

    // Verify if both passwords are same
    if (password === passwordVerify) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          backendCreateUser(userCredential).catch((error) => {
            console.log(error);
          });
          
          setSignUpError(false);
          navigate('/main');
        })
        .catch((err0r) => {
          console.log('signUp() Error');
          console.log(err0r.message);
          setSignUpError(true);
          setMsg('The user already exists');
          setNavigateTo('/login');
        });
    } else {
      setSignUpError(true);
      setMsg('Please verify whether the two passwords match each other.');
      setNavigateTo('/signup');
      setPassword('');
      setPasswordVerify('');
      console.log('must be same password');
    }
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
        <Modal
          msg={msg}
          navigateTo={navigateTo}
        />
      )}
    </>
  );
};

export default SignUp;
