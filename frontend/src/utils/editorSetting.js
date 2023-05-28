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
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';

const editorSetting = {
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
    Youtube.configure({
      controls: false,
    }),
    Placeholder.configure({
      placeholder: 'Write something...'
    })
  ],
  autofocus: 'start',
};

export default editorSetting;
