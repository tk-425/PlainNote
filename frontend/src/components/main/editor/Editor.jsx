import './basicEditor.css';
import './Editor.css';
import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import MenuBar from './editor-menu/MenuBar';
import EditorButtons from './editor-buttons/EditorButtons';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';

const Editor = () => {
  const [doc, setDoc] = useState(null);

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      Underline,
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
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: { class: 'highlight-text-color' },
      }),
      Link.configure({
        openOnClick: true,
      }),
      Superscript,
      Subscript,
    ],
    content: ``,
    autofocus: true,
  });

  const saveDoc = () => {
    // TODO: save to the current note
    setDoc(editor.getJSON());
  };

  const saveAsDoc = () => {
    // TODO: create a new note and insert it into database
  }

  const resetDoc = () => {
    editor.commands.clearContent();
  };

  const loadDoc = () => {
    editor.commands.setContent(doc);
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
