import './styles/basicEditor.css';
import './styles/Editor.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../utils/firebase';
import MenuBar from './editor-menu/MenuBar';
import EditorButtons from './editor-buttons/EditorButtons';
import { EditorContent } from '@tiptap/react';
import editorUtils from './editor-utils';

const Editor = ({
  editor,
  note,
  setNote,
  allNotes,
  selectedNote,
  setSelectedNote,
}) => {
  const [user] = useAuthState(auth);

  const saveDoc = async () => {
    editorUtils.saveDoc(
      saveAsDoc,
      user,
      selectedNote,
      editor,
      setNote
    );
  };

  const saveAsDoc = async () => {
    editorUtils.saveAsDoc(editor, user, setNote);
  };

  const resetDoc = () => {
    editorUtils.resetDoc(setNote, setSelectedNote, editor);
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
