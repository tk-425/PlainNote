import './styles/EditorButtons.css';
import icons from '../../../../utils/icons';

const EditorButtons = (props) => {
  const { saveDoc, saveAsDoc, resetDoc } = props;

  return (
    <div className='editor_buttons__container'>
      <div className='editor_buttons__contents flex item-center'>
        <button
          className='editor-button'
          onClick={saveDoc}
        >
          <img
            className='button__icon'
            src={icons.saveWhite}
            title='Save'
            alt='save'
          />
        </button>
        <button
          className='editor-button'
          onClick={saveAsDoc}
        >
          <img
            className='button__icon'
            src={icons.saveAsWhite}
            title='Save As'
            alt='save-as'
          />
        </button>
        <button
          className='editor-button'
          onClick={resetDoc}
        >
          <img
            className='button__icon'
            src={icons.resetWhite}
            title='Clear'
            alt='clear'
          />
        </button>
      </div>
    </div>
  );
};

export default EditorButtons;
