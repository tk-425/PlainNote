const getTitle = (str) => {
  return str.split('\n')[0];
};

const saveDoc = async ({ user, editor, selectedNote, setNote }) => {
  if (!selectedNote) {
    saveAsDoc({ editor, user, setNote});
    return;
  }

  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        noteId: selectedNote.id,
        title: getTitle(editor.getText()),
        noteBody: editor.getHTML(),
      }),
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/notes/update`;
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('SaveDoc error');
    }

    setNote(editor.getHTML());
  } catch (error) {
    console.log(error);
  }
};

const saveAsDoc = async ({ editor, user, setNote }) => {
  // first line becomes the title of the note
  const titleLine = getTitle(editor.getText());

  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.uid,
        title: titleLine,
        noteBody: editor.getHTML(),
      }),
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/notes`;
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('SaveAsDoc error');
    }

    setNote(editor.getHTML());
  } catch (error) {
    console.log(error);
  }
};

const resetDoc = ({ editor, setNote, setSelectedNote }) => {
  setNote(null);
  setSelectedNote(null);
  editor.commands.clearContent();
};

const editorUtils = {
  saveDoc,
  saveAsDoc,
  resetDoc,
};

export default editorUtils;
