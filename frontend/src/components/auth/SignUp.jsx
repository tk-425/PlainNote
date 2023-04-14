import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import AuthInputBoxes from './AuthInputBoxes';

const SignUp = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [navigate, user]);

  const signUp = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
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
        <div className='sign_in__container max-width text-center grid-container-center'>
          <form onSubmit={signUp}>
            <h1>Sign Up - Create your account</h1>
            <AuthInputBoxes
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
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
