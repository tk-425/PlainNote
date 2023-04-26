import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';
import tiptap from '../../utils/tiptap';

const MainPage = () => {
  const [user] = useAuthState(auth);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      navigate('/');
    }
  }, [navigate, user]);

  // TODO: get notes
  const getNotes = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      };
      const url = `http://localhost:8080/api/v1/user/notes/${user.uid}`;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Getting Notes failed');
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {authenticated && (
        <>
          <Sidebar getNotes={getNotes} />
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
