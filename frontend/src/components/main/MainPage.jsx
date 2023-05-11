import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';
import { useEditor } from '@tiptap/react';
import editorSetting from '../../utils/editorSetting';
import MainNavBar from './main-navbar/MainNavBar';

const MainPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [authenticated, setAuthenticated] = useState(false);
  const [note, setNote] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const editor = useEditor(editorSetting);

  useEffect(() => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <>
      {authenticated && (
        <>
          <MainNavBar />
          <Sidebar
            editor={editor}
            note={note}
            setNote={setNote}
            allNotes={allNotes}
            setAllNotes={setAllNotes}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
          />
          <Editor
            editor={editor}
            note={note}
            setNote={setNote}
            allNotes={allNotes}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
          />
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
TODO: Implement
If a user can't connect to server or it is not working,
show server error info.
Maybe Server: connected info??
*/
