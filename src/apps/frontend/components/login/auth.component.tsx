import React, { useCallback, useState } from 'react';
import { useDeps, AuthDetailsProvider } from '../../contexts';
import { LoginUserDetails, SignupUserDetails } from '../../types/auth.types';
import InputComponent from './input.component';
import { useNavigate } from 'react-router-dom';

export default function AuthComponent(): React.ReactElement {
  const navigate = useNavigate();
  React.useEffect(() => {
    if(localStorage.getItem('x-auth-token')) {
      navigate('/home');
    }
  }, []);

  const { accessService, signupService } = useDeps();
  const [authUserDetails, setAuthUserDetails] = useState<LoginUserDetails | SignupUserDetails>({
    username: '',
    password: '',
    email: '',
  });
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");

  React.useEffect(() => {setError("")},[authUserDetails]);

  const handleSelect = (isLogin: boolean) => {
    setLogin(isLogin);
    setAuthUserDetails({
      username: '',
      password: '',
      email: '',
    });
    setError("");
  }

  const loginHandler = useCallback(async (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.preventDefault();
    setError("Please wait...");

    try {
      const res:any = login ? await accessService.login(authUserDetails as LoginUserDetails) :
        await signupService.register(authUserDetails as SignupUserDetails);
      if (res.data) {
        localStorage.setItem('x-auth-token', res.data.token);
        setError("");
        navigate('/home');
      }
    } catch (err) {
      setError(err.response.data.message);
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
          <button className="auth__btn" onClick={(e)=>loginHandler(e)}>{login?"Login":"Signup"}</button>
          {error && <p className="error__txt">Error: {error}!</p>}
       </div>
    </AuthDetailsProvider>
  );
}
