import './styles/Credit.css';
import images from '../../utils/images';
import creditContents from '../../utils/creditContents';
import { Link } from 'react-router-dom';

const Credit = () => {
  return (
    <div className='credit__container grid-container-center max-width width-100 text-center flex item-center'>
      <div className='credit__contents flex item-center'>
        <div className='credit__info'>
          <h1 className='credit__title'>Credit</h1>
          <div className='credit__box flex flex-col'>
            {creditContents.map((credit) => (
              <div
                className='credit_box__contents'
                key={credit.type}
              >
                <span className='credit__type'>{credit.type}: </span>
                <span>
                  <Link
                    className='credit__url text-hover'
                    href={credit.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {credit.title}
                  </Link>
                </span>
              </div>
            ))}
          </div>
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
