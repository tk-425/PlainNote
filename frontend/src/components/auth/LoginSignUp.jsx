import './styles/LoginSignUp.scss';
import { auth } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icons from '../../utils/icons';
import authUtils from './auth-utils';

const LoginSignUp = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const [msg, setMsg] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate('/main');
  }, [navigate, user]);

  const signUp = async (e) => {
    e.preventDefault();

    await authUtils.signUp({
      auth,
      email,
      password,
      passwordVerify,
      navigate,
      setMsg,
      setPassword,
      setPasswordVerify,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    await authUtils.logIn({
      auth,
      email,
      password,
      navigate,
      setMsg,
      setEmail,
      setPassword,
    });
  };

  const signUpWithGoogle = async () => {
    await authUtils.googleSignUp(auth);
  };

  const logInSignUpToggle = () => {
    setMsg('');
    setEmail('');
    setShowSignUp(!showSignUp);
  };

  return (
    <div className='login_signup__container flex item-center max-width width-100'>
      <div className='login_signup__contents flex item-center'>
        {showSignUp && (
          <div className='form__contents'>
            <form
              className='flex flex-col item-center'
              onSubmit={signUp}
            >
              <h1>Create Account</h1>
              <div className='social_login__container flex item-center'>
                <Link>
                  <img
                    src={icons.google}
                    title='Google'
                    alt='google'
                    onClick={signUpWithGoogle}
                  />
                </Link>
              </div>
              <span>or use your email for registration</span>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
              <input
                type='password'
                value={passwordVerify}
                onChange={(e) => setPasswordVerify(e.target.value)}
                placeholder='Verify Password'
              />
              <button type='submit'>Sign Up</button>
              <span className='error__message'>{msg}</span>
              <div className='form__footer flex flex-col'>
                <span>Already a member?</span>
                <button
                  className='form_footer__button'
                  type='submit'
                  onClick={logInSignUpToggle}
                >
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
        )}

        {!showSignUp && (
          <div className='form__contents'>
            <form
              className='flex flex-col item-center'
              onSubmit={login}
            >
              <h1>Sign In</h1>
              <div className='social_login__container flex item-center'>
                <Link>
                  <img
                    src={icons.google}
                    title='Google'
                    alt='google'
                    onClick={signUpWithGoogle}
                  />
                </Link>
              </div>
              <span>or use your account</span>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
              <Link
                className='password__link'
                to='/resetPassword'
              >
                Forgot your password?
              </Link>
              <button type='submit'>Sign In</button>
              <span className='error__message'>{msg}</span>
              <div className='form__footer flex flex-col'>
                <span>Don't have an account?</span>
                <button
                  className='form_footer__button'
                  type='submit'
                  onClick={logInSignUpToggle}
                >
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
