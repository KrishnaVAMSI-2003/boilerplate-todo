import React, { useCallback, useState } from 'react';
import { useDeps, AuthDetailsProvider } from '../../contexts';
import { LoginUserDetails, SignupUserDetails } from '../../types/auth.types';
import InputComponent from './input.component';
import { useNavigate } from 'react-router-dom';

export default function AuthComponent(): React.ReactElement {
  
  const navigate = useNavigate();
  const { accessService, signupService, setIsLoginPage, snackbar, setSnackbar } = useDeps();
  const [authUserDetails, setAuthUserDetails] = useState<LoginUserDetails | SignupUserDetails>({
    username: '',
    password: '',
    email: '',
  });
  const [login, setLogin] = useState(true);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {setIsLoginPage(true)},[]);

  const handleSelect = (isLogin: boolean) => {
    setLogin(isLogin);
    setAuthUserDetails({
      username: '',
      password: '',
      email: '',
    });
  }

  const loginHandler = useCallback(async (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const res:any = login ? await accessService.login(authUserDetails as LoginUserDetails) :
        await signupService.register(authUserDetails as SignupUserDetails);
       
      if (login) {
        localStorage.setItem('x-auth-token', res.data.token);
        localStorage.setItem('username', authUserDetails.username);
        localStorage.setItem('accountId', res.data.accountId);

        setSnackbar({...snackbar, open: true, message: "Successfully logged in!", severity: 'success'});
        setIsLoginPage(false);
        navigate('/home');
      } else {
        setLogin(true);
        handleSelect(true);
        setDisabled(false);
        setSnackbar({...snackbar, open: true, message: "Successfully registered! Login to proceed...", severity: 'success'})
      }
    } catch (err) {
      setDisabled(false);
      setSnackbar({...snackbar, open: true, message: err.response.data.message, severity: 'error'})
    }
    
  },[accessService, authUserDetails]);

  return (
    <AuthDetailsProvider authDetails={{authUserDetails, setAuthUserDetails}}>
       <div className="auth--container">
         <div className="select--btns--container">
            <button className={`${login?"select__btn__setbg":""} select__btn`} onClick={()=>handleSelect(true)}>Login</button>
            <button className={`${login?"":"select__btn__setbg"} select__btn`} onClick={()=>handleSelect(false)}>signup</button>
          </div>
         
          <h1>{login?"Login":"Signup"}</h1>
          <InputComponent inputType="username"/>
          { login ? <div></div> : <InputComponent inputType="email"/> }
          <InputComponent inputType="password"/>
          <button className="auth__btn" onClick={(e)=>loginHandler(e)} disabled={disabled}>{login?"Login":"Signup"}</button>
       </div>
    </AuthDetailsProvider>
  );
}
