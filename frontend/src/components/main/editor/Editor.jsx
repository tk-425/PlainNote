import './Editor.css';
import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import MenuBar from './menubar/MenuBar';
import save from '../../../assets/save.png';
import load from '../../../assets/load.png';
import reset from '../../../assets/reset.png';

const Editor = () => {
  const [doc, setDoc] = useState(null);

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Highlight.configure({ multicolor: true }),
    ],
    content: ``,
  });

  const saveDoc = () => {
    setDoc(editor.getJSON());
  };

  const clearDoc = () => {
    editor.commands.clearContent();
  };

  const loadDoc = () => {
    editor.commands.setContent(doc);
  };

  return (
    <div className='editor__container'>
      <div className='editor__content grid'>
        <MenuBar
          className='editor__menubar'
          editor={editor}
        />
        <EditorContent
          className='editor'
          editor={editor}
        />
        <div className='editor__buttons flex flex-center'>
          <button onClick={saveDoc}>
            <img
              src={save}
              title='Save'
              alt='save'
            />
          </button>
          <button onClick={loadDoc}>
            <img
              src={load}
              title='Load'
              alt='load'
            />
          </button>
          <button onClick={clearDoc}>
            <img
              src={reset}
              title='Clear'
              alt='clear'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
