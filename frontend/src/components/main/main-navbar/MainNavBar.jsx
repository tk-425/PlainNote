import './styles/MainNavBar.scss';
import { auth } from '../../../utils/firebase';
import { Link } from 'react-router-dom';
import icons from '../../../utils/icons';

const MainNavBar = () => {
  const handleLogout = () => {
    auth.signOut().catch((error) => console.log(error));
  };

  return (
    <div className='main_navbar__container flex'>
      {/* <span>Hello, {user.email.split('@')[0]}</span> */}
      <span>
        <Link to='/main'>
          <img
            className='navbar__logo'
            src={icons.logo}
            alt='logo'
          />
        </Link>
      </span>

      <Link
        to='/'
        onClick={handleLogout}
      >
        Logout
      </Link>
    </div>
  );
};

export default MainNavBar;
