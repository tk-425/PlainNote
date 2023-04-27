import './styles/EditorButtons.css';
import icons from '../../../../utils/icons';

const EditorButtons = (props) => {
  const { saveDoc, saveAsDoc, loadDoc, resetDoc } = props;

  return (
    <div className='editor_buttons__container flex item-center'>
      <div className='editor_buttons__contents'>
        <button onClick={saveDoc}>
          <img
            className='button__icon'
            src={icons.save}
            title='Save'
            alt='save'
          />
        </button>
        <button onClick={saveAsDoc}>
          <img
            className='button__icon'
            src={icons.saveAs}
            title='Save As'
            alt='save-as'
          />
        </button>
        <button onClick={loadDoc}>
          <img
            className='button__icon'
            src={icons.load}
            title='Load'
            alt='load'
          />
        </button>
        <button onClick={resetDoc}>
          <img
            className='button__icon'
            src={icons.reset}
            title='Clear'
            alt='clear'
          />
        </button>
      </div>
    </div>
  );
};

export default EditorButtons;
