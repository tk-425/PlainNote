import './styles/Home.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import images from '../../utils/images';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  });

  return (
    <div className='home__container grid-container-center max-width width-100 text-center'>
      {loading ? (
        <Loading />
      ) : (
        <div className='home__contents'>
          <h1>Home</h1>
          <div className='home__signup'>
            <Link
              className='home-button'
              to='/auth/signup'
            >
              Sign Up
            </Link>
          </div>
          <div className='home__body'>
            <div className='hero flex flex-col item-center'>
              <div>
                <img
                  src={images.screenPortrait}
                  alt=''
                />
              </div>
              <div>
                <img
                  src={images.mobileLandscape}
                  alt=''
                />
              </div>
              <div>
                <img
                  className='home__gif'
                  src={images.image}
                  alt=''
                />
              </div>
              <div>
                <img
                  className='home__gif'
                  src={images.youtube}
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
