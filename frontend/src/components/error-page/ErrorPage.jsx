import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='max-width text-center'>
      <div>
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
