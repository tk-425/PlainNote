import './styles/basicEditor.css';
import './styles/Editor.css';
import MenuBar from './editor-menu/MenuBar';
import { EditorContent } from '@tiptap/react';

const Editor = ({
  editor,
  // note,
  // setNote,
  // allNotes,
  // selectedNote,
  // setSelectedNote,
  active,
}) => {
  return (
    <div className='editor__container scroll-visibility'>
      <div className='editor__contents grid'>
        <MenuBar
          editor={editor}
          active={active}
        />
        <EditorContent
          className={`editor_area ${active ? '' : 'hide'}`}
          editor={editor}
        />
      </div>
    </div>
  );
};

export default Editor;
