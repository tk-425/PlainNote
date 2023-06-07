import './styles/ErrorPage.css';
import { Link } from 'react-router-dom';
import images from '../../utils/images';

const ErrorPage = () => {
  return (
    <div className='error__container grid-container-center max-width width-100 text-center flex item-center'>
      <div className='error__contents'>
        <img
          src={images.page404}
          alt=''
        />
        <h1>Oops! You seem to be lost.</h1>
        <Link
          className='form__button'
          to='/'
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
