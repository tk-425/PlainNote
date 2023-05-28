import './styles/MenuBar.css';
import icons from '../../../../utils/icons';
import { useCallback } from 'react';

const MenuBar = ({ editor, active }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const imageUrl = window.prompt('URL');

    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(640)),
        height: Math.max(180, parseInt(480)),
      });
    }
  };

  return (
    <div className={`menu_bar__container ${active ? '' : 'hide'}`}>
      <div className='menu_bar__contents flex flex-col item-center'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive('bold')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.bold}
            title='Bold'
            alt='bold'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive('italic')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.italic}
            title='Italic'
            alt='italic'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive('underline')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.underline}
            title='Underline'
            alt='underline'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive('paragraph')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.paragraph}
            title='Paragraph'
            alt='paragraph'
          />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 })
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.header1}
            title='Header 1'
            alt='header1'
          />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 })
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.header2}
            title='Header 2'
            alt='header2'
          />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 })
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.header3}
            title='Header 3'
            alt='header3'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={
            editor.isActive('superscript')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.supScript}
            title='Super-script'
            alt='super-script'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={
            editor.isActive('subscript')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.subScript}
            title='Sub-script'
            alt='sub-script'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive('bulletList')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.bulletList}
            title='Bullet List'
            alt='bullet-list'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive('orderedList')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.orderedList}
            title='Ordered List'
            alt='ordered-list'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive('blockquote')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.blockQuote}
            title='Block Quote'
            alt='block-quote'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive('code')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.codeInline}
            title='Inline Code'
            alt='inline-code'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive('codeBlock')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.codeBlock}
            title='Code Block'
            alt='code block'
          />
        </button>
        <button
          onClick={addImage}
          className='editor-button'
        >
          <img
            className='button__icon'
            src={icons.image}
            title='Add Image URL'
            alt='add url'
          />
        </button>

        <button
          onClick={addYoutubeVideo}
          className='editor-button'
        >
          <img
            className='button__icon'
            src={icons.youtube}
            title='Add Image URL'
            alt='add url'
          />
        </button>

        <button
          onClick={setLink}
          className={
            editor.isActive('link')
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.hyperLink}
            title='Hyperlink'
            alt='hyperlink'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
          className='editor-button'
        >
          <img
            className='button__icon'
            src={icons.hyperLinkDelete}
            title='Delete Hyperlink'
            alt='delete-hyperlink'
          />
        </button>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className='editor-button'
        >
          <img
            className='button__icon'
            src={icons.horizontalRule}
            title='Horizontal Line'
            alt='horizontal-rule'
          />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()
          }
          className={
            editor.isActive('highlight', { color: '#ffc078' })
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.highLightOrange}
            title='Orange Highlight'
            alt='highlight-orange'
          />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()
          }
          className={
            editor.isActive('highlight', { color: '#8ce99a' })
              ? 'editor-button is-active'
              : 'editor-button'
          }
        >
          <img
            className='button__icon'
            src={icons.highLightGreen}
            title='Green Highlight'
            alt='highlight-green'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className='editor-button'
        >
          <img
            className='button__icon'
            src={icons.undo}
            title='Undo'
            alt='undo'
          />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className='editor-button'
        >
          <img
            className='button__icon'
            src={icons.redo}
            title='Redo'
            alt='redo'
          />
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
