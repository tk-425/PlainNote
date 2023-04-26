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

const tiptap = {
  useEditor,
  EditorContent,
  Color,
  TextStyle,
  Underline,
  ListItem,
  StarterKit,
  Highlight,
  Link,
  Superscript,
  Subscript,
  Image,
  Dropcursor
};

export default tiptap;