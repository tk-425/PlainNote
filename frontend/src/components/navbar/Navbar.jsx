import './Navbar.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase';

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='navbar__container max-width'>
      <div className='navbar__content flex item-center'>
        <div className='navbar__logo text-start'>
          <Link to='/'>Logo</Link>
        </div>

        <div className='navbar__header text-center'>
          <Link to='/'>TIL: Today I Learned</Link>
        </div>

        <div className='navbar_signin text-end'>
          {user && (
            <Link
              to='/home'
              onClick={handleLogout}
            >
              Logout
            </Link>
          )}
          {!user && <Link to='/login'>Login/Sign Up</Link>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
