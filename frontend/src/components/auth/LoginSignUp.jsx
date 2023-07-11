import './styles/LoginSignUp.css';
import { auth } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import icons from '../../utils/icons';
import authUtils from '../../utils/auth-utils';

const LoginSignUp = () => {
  const { path } = useParams();
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const [msg, setMsg] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (path === 'signup') {
      setShowSignUp(true);
    }

    user && navigate('/main');
  }, [navigate, path, user]);

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

  const navigateToSignUp = () => {
    setMsg('');
    setEmail('');
    setShowSignUp(!showSignUp);
    navigate('/auth/signup');
  };

  const navigateToLogin = () => {
    setMsg('');
    setEmail('');
    setShowSignUp(!showSignUp);
    navigate('/auth/login');
  };

  return (
    <div className='login_signup__container flex item-center max-width width-100'>
      <div className='login_signup__contents flex item-center'>
        {/* Sign In */}
        {showSignUp && (
          <div className='form__contents'>
            <form
              className='flex flex-col item-center'
              onSubmit={signUp}
            >
              <div id='blankA' />
              <div id='blankB' />
              <h1
                className='form__h1'
                id='col1'
              >
                Create Account
              </h1>
              <div
                className='social_login__container flex item-center'
                id='col2'
              >
                <Link>
                  <img
                    src={icons.google}
                    title='Google'
                    alt='google'
                    onClick={signUpWithGoogle}
                  />
                </Link>
              </div>
              <span id='col3'>or use your email for registration</span>

              <input
                className='form__input'
                id='col5'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
              <input
                className='form__input'
                id='col6'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
              <input
                className='form__input'
                id='col7'
                type='password'
                value={passwordVerify}
                onChange={(e) => setPasswordVerify(e.target.value)}
                placeholder='Verify Password'
              />
              <button
                className='form__button'
                id='col8'
                type='submit'
              >
                Sign Up
              </button>
              <span
                className='error__message'
                id='col9'
              >
                {msg}
              </span>
              <div
                className='form__footer flex flex-col'
                id='col4'
              >
                <span>Already a member?</span>
                <button
                  className='form_footer__button'
                  type='submit'
                  onClick={navigateToLogin}
                >
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sign Up */}
        {!showSignUp && (
          <div className='form__contents'>
            <form
              className='flex flex-col item-center'
              onSubmit={login}
            >
              <div id='blankA' />
              <div id='blankB' />
              <h1
                className='form__h1'
                id='col1'
              >
                Sign In
              </h1>
              <div
                className='social_login__container flex item-center'
                id='col2'
              >
                <Link>
                  <img
                    src={icons.google}
                    title='Google'
                    alt='google'
                    onClick={signUpWithGoogle}
                  />
                </Link>
              </div>
              <span id='col3'>or use your account</span>

              <input
                className='form__input'
                col='col5'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
              <input
                className='form__input'
                id='col6'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
              <Link
                id='col7'
                className='password__link'
                to='/resetPassword'
              >
                Forgot your password?
              </Link>
              <button
                className='form__button'
                id='col8'
                type='submit'
              >
                Sign In
              </button>
              <span
                className='error__message'
                id='col9'
              >
                {msg}
              </span>
              <div
                className='form__footer flex flex-col'
                id='col4'
              >
                <span>Don't have an account?</span>
                <button
                  className='form_footer__button'
                  type='submit'
                  onClick={navigateToSignUp}
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
