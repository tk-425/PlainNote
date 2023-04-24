import './Sidebar.css';
import { useState } from 'react';

const Sidebar = () => {
  const [newNote, setNewNote] = useState(false);
  const [searchNote, setSearchNote] = useState(false);

  const getContent = () => {
    const content = [];
    for (let i = 1; i <= 40; i++) {
      content.push(
        <div
          className='sidebar_note__box block flex item-center'
          key={i}
        >
          Side {i}
        </div>
      );
    }

    return content;
  };

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

  return (
    <div className='sidebar__container scroll-visibility'>
      <div className='sidebar_search__box block flex flex-col item-center'>
        {!newNote && !searchNote && (
          <>
            <span>New Note / Search Note</span>
            <button onClick={createNote}>New Note</button>
            <button onClick={findNote}>Search Note</button>
          </>
        )}
        {newNote && !searchNote && (
          <>
            <button onClick={selectNotes}>CREATE_NOTE</button>
          </>
        )}
        {!newNote && searchNote && (
          <>
            <button onClick={selectNotes}>SEARCH_NOTE</button>
          </>
        )}
      </div>
      <div className='sidebar__contents'>
        <>{getContent()}</>
      </div>
    </div>
  );

};

export default Sidebar;
