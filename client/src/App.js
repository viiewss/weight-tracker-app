import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import WeightTrackerPage from './components/WeightTrackerPage';
import './styles.css';

function App() {
  return (
    <Router>
      <div className='container'>
        <nav className='nav-menu'>
          <ul>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </nav>
        <main className='main-content'>
          <Routes>
            <Route path='/register' element={<RegistrationPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/weight-tracker' element={<WeightTrackerPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
