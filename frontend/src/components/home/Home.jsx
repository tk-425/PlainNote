import './styles/Home.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import images from '../../utils/images';
import homeContents from '../../utils/homeContents';

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
          <div className='home__body'>
            <div className='hero__container flex flex-col item-center'>
              <h1 className='hero__title'>{homeContents.hero.title}</h1>
              <span className='hero__description'>
                {homeContents.hero.description}
              </span>
              <div className='hero__signup'>
                <Link
                  className='home-button'
                  to='/auth/signup'
                >
                  Sign Up for Free
                </Link>
              </div>
              <div className='hero__illustration flex item-center'>
                <img
                  src={images.illustHero01}
                  alt=''
                />
                <img
                  src={images.illustHero02}
                  alt=''
                />
              </div>
              <div className='hero__screenshot'>
                <img
                  className='desktop'
                  src={images.heroImage}
                  alt=''
                />
              </div>
            </div>

            <div className='feature__container flex flex-col item-center'>
              <h2 className='feature__title'>{homeContents.features.title}</h2>
              <div className='feature__content flex item-center'>
                <div className='flex flex-col item-center'>
                  <h3 className='feature_content__title'>
                    {homeContents.features.images.title}
                  </h3>
                  <span className='feature_content__description'>
                    {homeContents.features.images.description}
                  </span>
                  <img
                    className='feature__illustration'
                    src={images.illustPhoto}
                    alt=''
                  />
                </div>
                <img
                  className='feature__screenshot'
                  src={images.image}
                  alt=''
                />
              </div>
              <div className='feature__content flex item-center'>
                <div className='flex flex-col item-center'>
                  <h3 className='feature_content__title'>
                    {homeContents.features.code.title}
                  </h3>
                  <span className='feature_content__description'>
                    {homeContents.features.code.description}
                  </span>
                  <img
                    className='feature__illustration'
                    src={images.illustCode}
                    alt=''
                  />
                </div>
                <img
                  className='feature__screenshot'
                  src={images.code}
                  alt=''
                />
              </div>
              <div className='feature__content flex item-center'>
                <div className='flex flex-col item-center'>
                  <h3 className='feature_content__title'>
                    {homeContents.features.youtube.title}
                  </h3>
                  <span className='feature_content__description'>
                    {homeContents.features.youtube.description}
                  </span>
                  <img
                    className='feature__illustration'
                    src={images.illustYoutube}
                    alt=''
                  />
                </div>
                <img
                  className='feature__screenshot'
                  src={images.youtube}
                  alt=''
                />
              </div>
              <div className='feature__content flex item-center'>
                <div className='flex flex-col item-center'>
                  <h3 className='feature_content__title'>
                    {homeContents.features.mobile.title}
                  </h3>
                  <span className='feature_content__description'>
                    {homeContents.features.mobile.description}
                  </span>
                  <img
                    className='feature__illustration'
                    src={images.illustMobiles}
                    alt=''
                  />
                </div>
                <img
                  className='feature__screenshot'
                  src={images.mobileView}
                  alt=''
                />
              </div>
            </div>

            <div className='signup__container'>
              <h2 className='signup__title'>{homeContents.signup.title}</h2>
              <span className='signup__description'>
                {homeContents.signup.description}
              </span>
              <div className='hero__signup'>
                <Link
                  className='home-button'
                  to='/auth/signup'
                >
                  Sign Up
                </Link>
              </div>
              <div className='signup_illustration__contents flex item-center'>
                <img
                  className='signup__illustration'
                  src={images.illustSignup01}
                  alt=''
                />
                <img
                  className='signup__illustration'
                  src={images.illustSignup02}
                  alt=''
                />
                <img
                  className='signup__illustration'
                  src={images.illustSignup03}
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
