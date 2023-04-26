import './basicEditor.css';
import './Editor.css';
import { useState } from 'react';
import { auth } from '../../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import MenuBar from './editor-menu/MenuBar';
import EditorButtons from './editor-buttons/EditorButtons';
import { useEditor, EditorContent } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';

const Editor = () => {
  const [user] = useAuthState(auth);
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
      Image,
      Dropcursor,
    ],
    content: ``,
    autofocus: 'start',
  });

  // TODO: save to the current note
  const saveDoc = () => {
    setDoc(editor.getHTML());
  };

  // TODO: create a new note
  const saveAsDoc = async (e) => {
    e.preventDefault();

    const titleLine = editor.getText().split('\n')[0];

    try {
      const requestOption = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titleLine,
          noteBody: editor.getHTML(),
          userId: user.uid,
        }),
      };

      const response = await fetch(
        `http://localhost:8080/api/v1/notes`,
        requestOption
      );

      if (!response.ok) {
        throw new Error('Notes fetch error');
      }

      setDoc(editor.getHTML());
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: clear the current note
  const resetDoc = () => {
    editor.commands.clearContent();
  };

  // TODO: load the selected note
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
