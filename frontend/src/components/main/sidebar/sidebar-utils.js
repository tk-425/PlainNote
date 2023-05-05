const getNotes = async (user) => {
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

const createNote = ({ setNote, setSelectedNote, editor }) => {
  setNote(null);
  setSelectedNote(null);
  editor.commands.clearContent();
};

const showNotes = ({ setShowAllNotes, showAllNotes }) => {
  setShowAllNotes(!showAllNotes);
};

const searchNotes = async ({
  searchInputRef,
  setSearchLengthError,
  setSearchErrorDisplayStyle,
  user,
  setAllNotes,
}) => {
  if (!searchInputRef.current.value) {
    return;
  }

  if (searchInputRef.current.value.length < 3) {
    setSearchLengthError(true);
    setSearchErrorDisplayStyle('block');
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

    const data = await response.json();

    setAllNotes(data);
  } catch (error) {
    console.log(error);
  }
};

const deleteNote = async ({ user, n, editor, setNote, setNoteDeleted }) => {
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

const sidebarUtils = {
  getNotes,
  createNote,
  showNotes,
  searchNotes,
  deleteNote,
};

export default sidebarUtils;
