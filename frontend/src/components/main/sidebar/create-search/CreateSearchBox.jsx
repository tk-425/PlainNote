import './CreateSearchBox.css';

const CreateSearchBox = ({ select, text, placeholder }) => {
  return (
    <div className='create_note__container'>
      <div>
        <input
          type='text'
          placeholder={placeholder}
        />
        <button>{text}</button>
        <button onClick={select}>Go Back</button>
      </div>
    </div>
  );
};

export default CreateSearchBox;
