import './index-app-styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import SignUp from './components/auth/SignUp';
import MainPage from './components/main/MainPage';
import ErrorPage from './components/error-page/ErrorPage';
import ResetPassword from './components/auth/ResetPassword';
import LoginSignUp from './components/auth/LoginSignUp';
import { useState } from 'react';

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className={`App grid ${sidebarToggle ? 'active' : ''}`}>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path='/login'
          element={
            <>
              <Navbar />
              <LoginSignUp />
            </>
          }
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/resetPassword'
          element={
            <>
              <Navbar />
              <ResetPassword />
            </>
          }
        />
        <Route
          path='/main'
          element={
            <MainPage
              sidebarToggle={sidebarToggle}
              setSidebarToggle={setSidebarToggle}
            />
          }
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
