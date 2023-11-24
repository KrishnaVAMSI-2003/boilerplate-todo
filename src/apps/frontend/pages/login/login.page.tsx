import React from 'react';
import './login.page.css';
import AuthComponent from '../../components/login/auth.component';

export default function Login(): React.ReactElement {
  return(
    <div className="landing--bg">
        <div className="landing--pg--container">
          <img src="/assets/img/login-page-img.jpg" alt="image" className="login__page__image"/>
          <AuthComponent/>
        </div>
    </div>
  )
}