import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeps } from '../../contexts';
import './navbar.component.scss';

export default function Navbar(): React.ReactElement {
  const navigate = useNavigate();
  const { isLoginPage } = useDeps();
  const [tokenFound, setTokenFound] = React.useState(false);
  React.useEffect(() => {
    if(localStorage.getItem('x-auth-token')) {
      setTokenFound(true);
    }
  },[]);
  const handleHomeBtn = () => {
    if(tokenFound) {
      navigate('/home');
    }
  }
  const handleLoginBtn = () => {
    if(window.location.pathname === '/home') {
      localStorage.removeItem('x-auth-token');
      setTokenFound(false);
    }
    navigate('/');
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
