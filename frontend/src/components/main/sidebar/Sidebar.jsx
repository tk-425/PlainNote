import './styles/Sidebar.css';
import { useEffect, useState } from 'react';
import { auth } from '../../../utils/firebase';
import CreateSearchBox from './create-search/CreateSearchBox';
import { useAuthState } from 'react-firebase-hooks/auth';

const Sidebar = ({ editor, note, allNotes, setAllNotes, setSelectedNote}) => {
  const [user] = useAuthState(auth);
  const [newNote, setNewNote] = useState(false);
  const [searchNote, setSearchNote] = useState(false);

  useEffect(() => {
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

    getNotes().then((n) => {
      setAllNotes(n);
    });
  }, [user.accessToken, user.uid, note, setAllNotes]);

  const createNote = () => {
    setNewNote(!newNote);
  };

  const findNote = () => {
    setSearchNote(!searchNote);
  };

  const selectNotes = () => {
    setNewNote(false);
    setSearchNote(false);
  };

  const handleClick = (n) => {
    console.log(n);
    setSelectedNote(n);
    editor.commands.setContent(n.body);
  }

  return (
    <div className='sidebar__container scroll-visibility'>
      <div className='sidebar_search__box block flex flex-col item-center'>
        {/* Sidebar Menu */}
        {!newNote && !searchNote && (
          <>
            <span>New Note / Search Note</span>
            <button onClick={createNote}>New Note</button>
            <button onClick={findNote}>Search Note</button>
          </>
        )}
        {newNote && !searchNote && (
          <CreateSearchBox
            select={selectNotes}
            text='Create Note'
            placeholder='Enter Title'
          />
        )}
        {!newNote && searchNote && (
          <CreateSearchBox
            select={selectNotes}
            text='Search Note'
            placeholder='Search Title'
          />
        )}
      </div>
      {/* Notes */}
      <div className='sidebar__contents'>
        {allNotes.map((n) => (
          <div
            className='sidebar_note__box block flex item-center'
            key={n.id}
            onClick={() => handleClick(n)}
          >
            {n.title.length <= 24 && <>{n.title}</>}
            {n.title.length > 24 && <>{n.title.slice(0, 24)} ...</>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
