import './MenuBar.css';
import bold from '../../../../assets/bold.png';
import italic from '../../../../assets/italic.png';
import strike from '../../../../assets/strike.png';
import paragraph from '../../../../assets/paragraph.png';
import codeInline from '../../../../assets/inline-code.png';
import codeBlock from '../../../../assets/code-block.png';
import header1 from '../../../../assets/header1.png';
import header2 from '../../../../assets/header2.png';
import header3 from '../../../../assets/header3.png';
import bulletList from '../../../../assets/bullet-list.png';
import orderedList from '../../../../assets/ordered-list.png';
import blockQuote from '../../../../assets/block-quote.png';
import horizontalRule from '../../../../assets/horizontal-rule.png';
import highLightOrange from '../../../../assets/highlight-orange-stroke.png';
import highLightGreen from '../../../../assets/highlight-green-stroke.png';
import undo from '../../../../assets/undo.png';
import redo from '../../../../assets/redo.png';
import erase from '../../../../assets/erase.png';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='menu_bar__container'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <img
          src={bold}
          title='Bold'
          alt='bold'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <img
          src={italic}
          title='Italic'
          alt='italic'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <img
          src={strike}
          title='Strikethrough'
          alt='strike'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        <img
          src={paragraph}
          title='Paragraph'
          alt='paragraph'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <img
          src={header1}
          title='Header 1'
          alt='header1'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <img
          src={header2}
          title='Header 2'
          alt='header2'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <img
          src={header3}
          title='Header 3'
          alt='header3'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <img
          src={bulletList}
          title='Bullet List'
          alt='bullet-list'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <img
          src={orderedList}
          title='Ordered List'
          alt='ordered-list'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <img
          src={codeInline}
          title='Inline Code'
          alt='inline-code'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <img
          src={codeBlock}
          title='Code Block'
          alt='code block'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <img
          src={blockQuote}
          title='Block Quote'
          alt='block-quote'
        />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <img
          src={horizontalRule}
          title='Horizontal Line'
          alt='horizontal-rule'
        />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()
        }
        className={
          editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''
        }
      >
        <img
          src={highLightOrange}
          title='Orange Highlight'
          alt='highlight-orange'
        />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()
        }
        className={
          editor.isActive('highlight', { color: '#8ce99a' }) ? 'is-active' : ''
        }
      >
        <img
          src={highLightGreen}
          title='Green Highlight'
          alt='highlight-green'
        />
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <img
          src={undo}
          title='Undo'
          alt='undo'
        />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <img
          src={redo}
          title='Redo'
          alt='redo'
        />
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        <img
          src={erase}
          title='Toggle Selection'
          alt='toggle-selection'
        />
      </button>
    </div>
  );
};

export default MenuBar;
