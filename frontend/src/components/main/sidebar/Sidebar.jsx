import './styles/Sidebar.css';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import messages from '../../../utils/messages';
import sidebarUtils from './sidebar-utils';
import editorUtils from '../editor/editor-utils';
import icons from '../../../utils/icons';

const Sidebar = ({
  editor,
  note,
  setNote,
  allNotes,
  setAllNotes,
  selectedNote,
  setSelectedNote,
  sidebarToggle,
  setSidebarToggle,
}) => {
  const [user] = useAuthState(auth);
  const [noteDeleted, setNoteDeleted] = useState(false);
  const [showAllNotes, setShowAllNotes] = useState(true);
  const [searchLengthError, setSearchLengthError] = useState(false);
  const [searchErrorDisplayStyle, setSearchErrorDisplayStyle] = useState('');
  const [active, setActive] = useState(false);
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

  const hideMenu = () => {
    console.log('hide menu');
    setActive(!active);
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <div className={`sidebar__container grid ${active ? 'active' : ''}`}>
      {/* Menu Contents */}
      <div className='sidebar_menu__container block flex flex-col item-center'>
        {!searchLengthError && (
          <>
            {/* Menu Toggle Icon & User Info */}
            <div className='sidebar_toggle__menu flex item-center'>
              <button
                className='sidebar_menu__button'
                onClick={hideMenu}
              >
                {active ? (
                  <img
                    className='sidebar_toggle__icon'
                    src={icons.menuClose}
                    alt='menu'
                  />
                ) : (
                  <img
                    className='sidebar_toggle__icon'
                    src={icons.menu}
                    alt='menu'
                  />
                )}
              </button>
              <span>Hello, {user.email.split('@')[0].toUpperCase()}!</span>
            </div>

            {/* Menu Buttons */}
            <div className='sidebar_button__container flex flex-col item-center'>
              {/* New Note */}
              <div className='sidebar_button__contents flex'>
                <img
                  className='sidebar_note__icon'
                  src={icons.noteNew}
                  alt='new note'
                />
                <button
                  className='sidebar__button editor-button'
                  onClick={createNewNote}
                  type='button'
                >
                  <span className='button__text'>New Note</span>
                </button>
              </div>

              {/* Show All Notes */}
              <div className='sidebar_button__contents flex'>
                <img
                  className='sidebar_note__icon'
                  src={icons.noteAll}
                  alt='show all notes'
                />
                <button
                  className='sidebar__button editor-button'
                  onClick={showNotes}
                  type='button'
                >
                  <span className='button__text'>All Notes</span>
                </button>
              </div>

              {/* Save */}
              <div className='sidebar_button__contents flex'>
                <img
                  className='sidebar_note__icon'
                  src={icons.save}
                  alt='save'
                />
                <button
                  className='sidebar__button editor-button'
                  onClick={saveDoc}
                  type='button'
                >
                  <span className='button__text'>Save</span>
                </button>
              </div>

              {/* Search */}
              <div className='sidebar_button__contents flex'>
                <img
                  className='sidebar_note__icon'
                  src={icons.search}
                  alt='search'
                />
                <input
                  type='text'
                  ref={searchInputRef}
                  min={3}
                  placeholder='Search Notes'
                />
                <button
                  className='sidebar__button editor-button search__button'
                  onClick={searchNotes}
                  type='button'
                >
                  <span className='button__text'>Search</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Menu Overlay */}
        {searchLengthError && (
          <div
            className={`sidebar_overlay__container flex flex-col item-center ${searchErrorDisplayStyle}`}
            onClick={overlayOff}
          >
            <div className='sidebar_overlay__msg'>{messages.searchLength}</div>
            <button className='sidebar_close__button editor-button'>X</button>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className='sidebar_notes__container scroll-visibility'>
        {allNotes?.map((n) => (
          <div
            className='sidebar_note__contents flex item-center'
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
