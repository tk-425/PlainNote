import './styles/basicEditor.css';
import './styles/Editor.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../utils/firebase';
import MenuBar from './editor-menu/MenuBar';
import EditorButtons from './editor-buttons/EditorButtons';
import { EditorContent } from '@tiptap/react';

const Editor = ({ editor, note, setNote, allNotes, selectedNoteId }) => {
  const [user] = useAuthState(auth);

  // TODO: use selectedNoteId to save the current note
  const saveDoc = () => {
    setNote(editor.getHTML());
  };

  const saveAsDoc = async (e) => {
    e.preventDefault();

    // first line becomes the title of the note
    const titleLine = editor.getText().split('\n')[0];

    try {
      const requestOption = {
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

      const response = await fetch(
        `http://localhost:8080/api/v1/notes`,
        requestOption
      );

      if (!response.ok) {
        throw new Error('Notes fetch error');
      }

      setNote(editor.getHTML());
    } catch (error) {
      console.error(error);
    }
  };

  const resetDoc = () => {
    editor.commands.clearContent();
  };

  const loadDoc = () => {
    editor.commands.setContent(note);
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
          loadDoc={loadDoc}
          resetDoc={resetDoc}
        />
      </div>
    </div>
  );
};

export default Editor;
