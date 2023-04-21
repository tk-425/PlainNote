import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';

const MainPage = () => {
  const [user] = useAuthState(auth);
  const [authenticated, setAuthenticated] = useState(false);
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

        const url = `http://localhost:8080/api/v1/user`;
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error('Authentication Failed');
        }

        // console.log(user.uid);
        // console.log(user.email);

        setAuthenticated(true);
      };

      backendAuthCheck().catch((error) => {
        setAuthenticated(false);
        console.log(error);
      });
    }
  }, [navigate, user]);

  return (
    <>
      {authenticated && (
        <>
          <Sidebar />
          <Editor />
        </>
      )}
      {!authenticated && (
        <div className='text-center'>
          <h3>Server not connected...</h3>
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
