import React from 'react';
import { useAuthDetails } from '../../contexts';

type InputComponentProps = {
  inputType: string
}

const icons:{[key: string]: any}  = {
  username : "👤",
  email : "📧",
  password : "🔒"
}


const InputComponent = (props: InputComponentProps) => {
  const {authUserDetails, setAuthUserDetails} = useAuthDetails();
  const {inputType} = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthUserDetails({...authUserDetails, [inputType]: e.target.value});
  }
  return (
      <div className="inp--container">
          <span className="inp__icon">{icons[inputType]}</span>
          <input type={inputType==="password"?"password":"text"} value={authUserDetails[inputType]} className="auth__inp" required
              onChange={(e)=>{handleChange(e)}}
          />
          <label>{inputType}</label>
      </div>
  )
}

export default InputComponent;