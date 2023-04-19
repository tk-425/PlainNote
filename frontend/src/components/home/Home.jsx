import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  })

  return (
    <div className='home__container grid-container-center max-width width-100 text-center'>
      <div>Home</div>
    </div>
  );
};

export default Home;
