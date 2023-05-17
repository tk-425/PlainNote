import './styles/Footer.css';
import logos from '../../utils/logos';

const Footer = () => {
  return (
    <footer className='footer__container width-100 flex item-center'>
      <div className='footer__contents flex flex-col item-center'>
        <div className='footer__header flex item-center'>
          <img src={logos.logoIconBlack} alt="logo" />
          <span>PlainNote</span>
        </div>
        <div className="footer__body">
          <div>%%%%%</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
