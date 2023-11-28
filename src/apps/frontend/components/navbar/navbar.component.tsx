import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeps } from '../../contexts';
import './navbar.component.scss';

export default function Navbar(): React.ReactElement {
  const navigate = useNavigate();
  const { isLoginPage, snackbar, setSnackbar } = useDeps();
  const [tokenFound, setTokenFound] = React.useState(false);
  React.useEffect(() => {
    if(localStorage.getItem('x-auth-token')) {
      setTokenFound(true);
    }
  },[]);
  const handleHomeBtn = () => {
    if(!isLoginPage) {
      setSnackbar({...snackbar, open: true, message: 'In Home page...', severity: 'info'});
      return;
    }

    if(tokenFound) {
      navigate('/home');
        setSnackbar({...snackbar, open: true, message: 'Account found! Navigated to home page...', severity: 'info'});
    } else {
      setSnackbar({...snackbar, open: true, message: 'No account found! Login to proceed...', severity: 'warning'});
    }
  }
  const handleLoginBtn = () => {
    if(window.location.pathname === '/home') {
      localStorage.removeItem('x-auth-token');
      localStorage.removeItem('username');
      localStorage.removeItem('accountId');
      setTokenFound(false);
      setSnackbar({...snackbar, open: true, message: 'Logged out successfully!', severity: 'success'});
      navigate('/');
    } else {
      setSnackbar({...snackbar, open: true, message: 'In Login page...', severity: 'info'});
    }
    
  }
  return (
    <div className='navbar--container'>
      <div className='navbar--icon--container'>
        <img src='/assets/img/todoNavIcon.png' alt='logo' className='navbar__logo'/>
        <h1 className='navbar__title'>Todo App</h1>
      </div>
      <div className="navbar--btns--container">
        <button className={`navbar__btn ${!isLoginPage && 'navbar__btn__highlighted'}`}
        title={`${tokenFound ? 'Token found click to navigate to home page':'No token found login to proceed'}`}
        onClick={handleHomeBtn}>Home</button>
        <button className={`navbar__btn ${isLoginPage && 'navbar__btn__highlighted'}`} onClick={handleLoginBtn}>{isLoginPage ? 'Login' : 'Logout'}</button>
      </div>
      <div className="navbar__underline"></div>
    </div>
  );
}
