import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import AuthInputBoxes from './AuthInputBoxes';

const SignUp = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [navigate, user]);

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

      const response = await fetch(
        `http://localhost:8080/api/v1/user`,
        requestOption
      );

      if (!response.ok) {
        throw new Error('Server Error');
      }

      const data = await response.json();

      return data;
    };

    // Verify if both passwords are same
    if (password === passwordVerify) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          backendCreateUser(userCredential).catch((error) => {
            console.log(error);
          });
          navigate('/main');
        })
        .catch((err0r) => {
          console.log(err0r.message);
          navigate('/error');
        });
    } else {
      setPassword('');
      setPasswordVerify('');
      console.log('must be same password');
    }
  };

  return (
    <>
      {!user && (
        <div className='sign_in__container max-width text-center grid-container-center'>
          <form onSubmit={signUp}>
            <h1>Sign Up - Create your account</h1>
            <AuthInputBoxes
              email={email}
              password={password}
              passwordVerify={passwordVerify}
              setEmail={setEmail}
              setPassword={setPassword}
              setPasswordVerify={setPasswordVerify}
            />
            <button type='submit'>Sign Up</button>
          </form>
          <div>
            <Link to='/login'>Log In</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
