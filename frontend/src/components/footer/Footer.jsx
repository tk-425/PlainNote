import './styles/Footer.css';
import logos from '../../utils/logos';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer__container width-100 flex item-center'>
      <div className='footer__contents flex flex-col item-center'>
        <div className='footer__header flex item-center'>
          <img
            src={logos.logoIconBlack}
            alt='logo'
          />
          <span>PlainNote</span>
        </div>
        <div className='footer__body flex flex-col item-center'>
          <div className='footer__link text-hover'>
            <Link to='/credit'>Credit</Link>
          </div>
          <div className='footer__link text-hover'>
            <Link
              to='https://github.com/tk-425/PlainNote'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
