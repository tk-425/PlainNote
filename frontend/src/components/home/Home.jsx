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
    <div className='home__container max-width text-center'>
      <div>Home</div>
    </div>
  );
};

export default Home;
