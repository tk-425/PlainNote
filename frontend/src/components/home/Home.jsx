import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import Footer from '../footer/Footer';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  });

  return (
    <>
      <div className='home__container grid-container-center max-width width-100 text-center'>
        {loading ? <Loading /> : <div>Home</div>}
      </div>
      <Footer />
    </>
  );
};

export default Home;
