import './styles/MainNavBar.scss';
import { auth } from '../../../utils/firebase';
import { Link } from 'react-router-dom';
import logos from '../../../utils/logos';

const MainNavBar = () => {
  const handleLogout = () => {
    auth.signOut().catch((error) => console.log(error));
  };

  return (
    <div className='main_navbar__container flex'>
      <span>
        <Link
          className='flex item-center'
          to='/main'
        >
          <img
            className='navbar__logo'
            src={logos.logoIconWhite}
            alt='logo'
          />
          <span className='flex item-center'>PlainNote</span>
        </Link>
      </span>

      <Link
        className='navbar__logout flex item-center'
        to='/'
        onClick={handleLogout}
      >
        Logout
      </Link>
    </div>
  );
};

export default MainNavBar;
