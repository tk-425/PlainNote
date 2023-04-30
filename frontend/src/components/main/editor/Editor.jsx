import './styles/basicEditor.css';
import './styles/Editor.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../utils/firebase';
import MenuBar from './editor-menu/MenuBar';
import EditorButtons from './editor-buttons/EditorButtons';
import { EditorContent } from '@tiptap/react';

const Editor = ({
  editor,
  note,
  setNote,
  allNotes,
  selectedNote,
  setSelectedNote,
}) => {
  const [user] = useAuthState(auth);

  const getTitle = (str) => {
    return str.split('\n')[0];
  };

  // Save
  const saveDoc = async (e) => {
    e.preventDefault();

    const titleLine = getTitle(editor.getText());

    if (!selectedNote) {
      throw new Error("Selected Note is null");
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
          title: titleLine,
          noteBody: editor.getHTML(),
        }),
      };

      const url = `http://localhost:8080/api/v1/notes/update`;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('SaveDoc error');
      }

      setNote(editor.getHTML());
    } catch (error) {
      console.log(error);
    }
  };

  // Save As
  const saveAsDoc = async (e) => {
    e.preventDefault();

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

      const url = `http://localhost:8080/api/v1/notes`;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('SaveAsDoc error');
      }

      setNote(editor.getHTML());
    } catch (error) {
      console.log(error);
    }
  };

  // Reset
  const resetDoc = () => {
    setNote(null);
    setSelectedNote(null);
    editor.commands.clearContent();
  };

  return (
    <div className='editor__container scroll-visibility'>
      <div className='editor__content grid'>
        <MenuBar editor={editor} />
        <EditorContent
          className='editor_area'
          editor={editor}
        />
        <EditorButtons
          saveDoc={saveDoc}
          saveAsDoc={saveAsDoc}
          resetDoc={resetDoc}
        />
      </div>
    </div>
  );
};

export default Editor;
