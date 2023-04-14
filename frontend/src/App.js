import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import MainPage from './components/main/MainPage';
import Footer from './components/footer/Footer';
import ErrorPage from './components/error-page/ErrorPage';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/login'
          element={<LogIn />}
        />
        <Route
          path='/signup'
          element={<SignUp />}
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
      <Footer />
    </div>
  );
}

export default App;
