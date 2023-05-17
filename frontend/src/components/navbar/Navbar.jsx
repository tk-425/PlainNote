import './styles/Navbar.css';
import logos from '../../utils/logos';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar__container width-100'>
      <div className='navbar__contents flex item-center'>
        {/* Logo */}
        <div className='navbar_logo__contents text-start'>
          <Link to='/'>
            <img
              className='navbar__logo'
              src={logos.logoIconBlack}
              alt='logo'
            />
          </Link>
        </div>

        {/* Title */}
        <div className='navbar_header__contents text-center'>
          <Link to='/'>
            <span className='navbar__header'>PlainNote</span>
          </Link>
        </div>

        {/* Login */}
        <div className='navbar_signin__contents text-end'>
          <Link
            className='home-button'
            to='/auth/login'
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
