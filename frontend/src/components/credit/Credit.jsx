import './styles/Credit.css';
import images from '../../utils/images';
import creditContents from '../../utils/creditContents';

const Credit = () => {
  return (
    <div className='credit__container grid-container-center max-width width-100 text-center flex item-center'>
      <div className='credit__contents flex item-center'>
        <div className='credit__info'>
          <h1 className='credit__title'>Credit</h1>
          {creditContents.map((credit) => (
            <div
              className='flex'
              key={credit.type}
            >
              <span className='credit__type'>{credit.type}: </span>
              <span className='credit__url'>
                <a href={credit.url}>{credit.title}</a>
              </span>
            </div>
          ))}
        </div>
        <img
          className='credit__illustration'
          src={images.credit}
          alt=''
        />
      </div>
    </div>
  );
};

export default Credit;
