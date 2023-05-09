import './index-app-styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import MainPage from './components/main/MainPage';
import Footer from './components/footer/Footer';
import ErrorPage from './components/error-page/ErrorPage';
import ResetPassword from './components/auth/ResetPassword';
import LoginSignUp from './components/auth/LoginSignUp';

function App() {
  return (
    <div className='App grid'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        {/* <Route
          path='/login'
          element={<LogIn />}
        /> */}
        <Route
          path='/login'
          element={
            <>
              <Navbar />
              <LoginSignUp />
              <Footer />
            </>
          }
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/resetPassword'
          element={<ResetPassword />}
        />
        <Route
          path='/main'
          element={<MainPage />}
        />
        <Route
          path='*'
          element={<ErrorPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
