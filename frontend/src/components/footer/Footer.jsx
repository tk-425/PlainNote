import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../../utils/firebase';
import './Footer.css';

const Footer = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      {!user && (
        <footer className='footer__container max-width text-center'>
          <div>Footer</div>
        </footer>
      )}
    </>
  );
};

export default Footer;
