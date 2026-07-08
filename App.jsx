import React from 'react';
import { HomePage } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

function App() {
  return (
    <>
      <HomePage />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar pauseOnHover closeOnClick />
    </>
  );
}

export default App;
