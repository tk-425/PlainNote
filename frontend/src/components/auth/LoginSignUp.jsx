import './styles/LoginSignUp.scss';
import { Link } from 'react-router-dom';
import icons from '../../utils/icons';
import { useState } from 'react';

const LoginSignUp = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const signUp = () => {
    // sign-up
  };

  const login = () => {
    // login
  };

  const logInSignUpToggle = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className='login_signup__container flex flex-col item-center'>
      {/* <div className='sign_up__form form__contents'>
        <form
          className='flex flex-col item-center'
          onSubmit={signUp}
        >
          <h1>Create Account</h1>
          <div className='social_login__container flex item-center'>
            <Link>
              <img
                src={icons.facebook}
                title='Facebook'
                alt='facebook'
              />
            </Link>
            <Link>
              <img
                src={icons.google}
                title='Google'
                alt='google'
              />
            </Link>
          </div>
          <span>or use your email for registration</span>
          <input
            type='email'
            placeholder='Email'
          />
          <input
            type='password'
            placeholder='Password'
          />
          <input
            type='password'
            placeholder='Verify Password'
          />
          <button type='button'>Sign Up</button>
          <div className='form__footer flex flex-col'>
            <span>Already a member?</span>
        <button className='form_footer__button' type='button' onClick={logInSignUpToggle}>SIGN UP</button>          </div>
        </form>
      </div> */}

      <div className='sign_in__form form__contents'>
        <form
          className='flex flex-col item-center'
          onSubmit={login}
        >
          <h1>Sign In</h1>
          <div className='social_login__container flex item-center'>
            <Link>
              <img
                src={icons.facebook}
                title='Facebook'
                alt='facebook'
              />
            </Link>
            <Link>
              <img
                src={icons.google}
                title='Google'
                alt='google'
              />
            </Link>
          </div>
          <span>or use your account</span>
          <input
            type='email'
            placeholder='Email'
          />
          <input
            type='password'
            placeholder='Password'
          />
          <Link to='/resetPassword'>Forgot your password?</Link>
          <button type='button'>Sign In</button>
          <div className='form__footer flex flex-col'>
            <span>Don't have an account?</span>
            <button
              className='form_footer__button'
              type='button'
              onClick={logInSignUpToggle}
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>

      {/* <div className='login__form form__contents'>
        <form
          className='flex flex-col item-center'
          onSubmit={login}
        >
          <h1>Sign In</h1>
          <div className='social_login__container'>
            <Link>Facebook</Link>
            <Link>Google</Link>
          </div>
          <span>or use your account</span>
          <input
            type='email'
            placeholder='Email'
          />
          <input
            type='password'
            placeholder='Password'
          />
          <Link>Forgot your password?</Link>
          <button>Sign In</button>
        </form>
      </div> */}
    </div>
  );
};

export default LoginSignUp;
