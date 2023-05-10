import './styles/Sidebar.css';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import messages from '../../../utils/messages';
import sidebarUtils from './sidebar-utils';
import { Link } from 'react-router-dom';
import editorUtils from '../editor/editor-utils';

const Sidebar = ({
  editor,
  note,
  setNote,
  allNotes,
  setAllNotes,
  selectedNote,
  setSelectedNote,
}) => {
  const [user] = useAuthState(auth);
  const [noteDeleted, setNoteDeleted] = useState(false);
  const [showAllNotes, setShowAllNotes] = useState(true);
  const [searchLengthError, setSearchLengthError] = useState(false);
  const [searchErrorDisplayStyle, setSearchErrorDisplayStyle] = useState('');
  const searchInputRef = useRef(null);

  // The sidebar will be rerendered when a note is deleted or
  // when a user presses the "show all notes" button.
  useEffect(() => {
    sidebarUtils.getNotes(user).then((n) => {
      setAllNotes(n);
      setNoteDeleted(false);
      searchInputRef.current.value = '';
    });
  }, [user, note, setAllNotes, noteDeleted, showAllNotes]);

  const createNewNote = () => {
    sidebarUtils.createNote({ setNote, setSelectedNote, editor });
  };

  const showNotes = () => {
    sidebarUtils.showNotes({ setShowAllNotes, showAllNotes });
  };

  const searchNotes = async () => {
    sidebarUtils.searchNotes({
      searchInputRef,
      setSearchLengthError,
      setSearchErrorDisplayStyle,
      user,
      setAllNotes,
    });
  };

  const deleteNote = async (n) => {
    sidebarUtils.deleteNote({ user, n, editor, setNote, setNoteDeleted });
  };

  const saveDoc = async () => {
    editorUtils.saveDoc({ user, editor, selectedNote, setNote });
  };

  const overlayOff = () => {
    setSearchErrorDisplayStyle('none');
    setSearchLengthError(false);
  };

  const handleNoteClick = (n) => {
    setSelectedNote(n);
    editor.commands.setContent(n.body);
  };

  const handleLogout = () => {
    auth.signOut().catch((error) => console.log(error));
  };

  return (
    <div className='sidebar__container scroll-visibility'>
      {/* Search Box */}
      <div className='sidebar_search__box block flex flex-col item-center'>
        {!searchLengthError && (
          <>
            <div className='sidebar_user__info flex'>
              <span>Hello, {user.email.split('@')[0]}!</span>
              <span>
                <Link
                  to='/'
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </span>
            </div>
            <button
              className='sidebar__button editor-button'
              onClick={createNewNote}
            >
              New Note
            </button>
            <button
              className='sidebar__button editor-button'
              onClick={showNotes}
            >
              Show All Notes
            </button>
            <div className='search_box__container flex flex-col item-center'>
              <input
                type='text'
                ref={searchInputRef}
                min={3}
                placeholder='Search Notes'
              />
              <button
                className='editor-button'
                onClick={searchNotes}
              >
                Search
              </button>
              <button
                className='editor-button sidebar__button'
                onClick={saveDoc}
              >
                Save
              </button>
            </div>
          </>
        )}

        {searchLengthError && (
          <div
            className={`sidebar_overlay__container flex flex-col item-center ${searchErrorDisplayStyle}`}
            onClick={overlayOff}
          >
            <div className='sidebar_overlay__msg'>{messages.searchLength}</div>
            <button className='editor-button'>X</button>
          </div>
        )}
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
              {n.title.length <= 24 && <span>{n.title}</span>}
              {n.title.length > 24 && <span>{n.title.slice(0, 24)} ...</span>}
            </div>
            <button
              className='sidebar_close__button editor-button'
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
