import './styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar__container max-width width-100'>
      <div className='navbar__content flex item-center'>

        <div className='navbar__logo text-start'>
          <Link to='/'>Logo</Link>
        </div>

        <div className='navbar__header text-center'>
          <Link to='/'>TIL: Today I Learned</Link>
        </div>

        <div className='navbar_signin text-end'>
          <Link className='navbar__login__button' to='/login'>Login</Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
