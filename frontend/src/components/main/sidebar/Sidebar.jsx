import './styles/Sidebar.css';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../../../utils/firebase';
// import CreateSearchBox from './create-search/CreateSearchBox';
import { useAuthState } from 'react-firebase-hooks/auth';

const Sidebar = ({
  editor,
  note,
  setNote,
  allNotes,
  setAllNotes,
  setSelectedNote,
}) => {
  const [user] = useAuthState(auth);
  const [noteDeleted, setNoteDeleted] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const searchInputRef = useRef(null);

  // The sidebar will be rerendered when a note is deleted or
  // when a user presses the "show all notes" button.
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
      setNoteDeleted(false);
      searchInputRef.current.value = '';
    });
  }, [user.accessToken, user.uid, note, setAllNotes, noteDeleted, showNotes]);

  const createNote = () => {
    setNote(null);
    setSelectedNote(null);
    editor.commands.clearContent();
  };

  const showAllNotes = () => {
    setShowNotes(!showNotes);
  };

  const searchNotes = async () => {
    if (!searchInputRef.current.value) {
      return;
    }

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
        }),
      };

      const url = `http://localhost:8080/api/v1/notes/search-notes/${searchInputRef.current.value}`;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Search Note error');
      }

      // display searched notes to the sidebar
      const data = await response.json();

      setAllNotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (n) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          noteId: n.id,
        }),
      };

      const url = `http://localhost:8080/api/v1/notes/delete/${n.id}`;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('DeleteNote error');
      }

      editor.commands.clearContent();
      editor.commands.focus();
      setNote(null);
      setNoteDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteClick = (n) => {
    setSelectedNote(n);
    editor.commands.setContent(n.body);
  };

  return (
    <div className='sidebar__container scroll-visibility'>
      <div className='sidebar_search__box block flex flex-col item-center'>
        <button onClick={createNote}>New Note</button>
        <button onClick={showAllNotes}>Show All Notes</button>
        <div>
          <input
            type='text'
            ref={searchInputRef}
          />
          <button onClick={searchNotes}>Search</button>
        </div>
      </div>

      {/* Notes */}
      <div className='sidebar__contents'>
        {allNotes?.map((n) => (
          <div
            className='sidebar_note__box flex item-center'
            key={n.id}
          >
            <div
              className='sidebar__title flex item-center'
              onClick={() => handleNoteClick(n)}
            >
              {n.title.length <= 22 && <span>{n.title}</span>}
              {n.title.length > 22 && <span>{n.title.slice(0, 22)} ...</span>}
            </div>
            <button
              className='sidebar_close__button'
              onClick={() => deleteNote(n)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
