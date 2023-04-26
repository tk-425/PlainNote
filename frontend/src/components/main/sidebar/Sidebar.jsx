import './Sidebar.css';
import { useEffect, useState } from 'react';
import CreateSearchBox from './create-search/CreateSearchBox';

const Sidebar = ({ getNotes }) => {
  const [newNote, setNewNote] = useState(false);
  const [searchNote, setSearchNote] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes().then((note) => {
      setNotes(note);
      console.log(note);
    });
  }, [getNotes]);

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
      <div className='sidebar__contents'>
        {notes.map((n) => (
          <div
            className='sidebar_note__box block flex item-center'
            key={n.id}
            onClick={() => console.log(n.body)}
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
