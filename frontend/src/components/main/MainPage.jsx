import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import './MainPage.css';
import Sidebar from './sidebar/Sidebar';
import MainContent from './main-content/MainContent';

const MainPage = () => {
  const [user] = useAuthState(auth);
  const [authenticated, setAuthenticated] = useState(false);
  // const [httpError, setHttpError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setAuthenticated(false);
      navigate('/');
    } else {
      const backendAuthCheck = async () => {
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json',
          },
        };

        const url = 'http://localhost:8080/app/test';
        const responseFromBackend = await fetch(url, requestOptions);

        if (!responseFromBackend.ok) {
          throw new Error('Authentication Failed');
        }

        setAuthenticated(true);
      };

      backendAuthCheck().catch((error) => {
        setAuthenticated(false);
        // setHttpError(error);
        console.log(error);
      });
    }

  }, [navigate, user]);

  return (
    <>
      {authenticated && (
        <div className='main__container grid max-width text-center'>
          <Sidebar />
          <MainContent />
        </div>
      )}
    </>
  );
};

export default MainPage;

/* 
NOTE: Implement
If a user can't connect to server or it is not working,
show server error info.
Maybe Server: connected info??
*/
