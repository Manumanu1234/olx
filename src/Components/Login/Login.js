import React, { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Firebase } from '../../config/config';
const auth = getAuth(Firebase);


function Login() {

  const navigate=useNavigate()
  const [spinner, setspinner] = useState('')
  const [mail, setmail] = useState('')
  const [pass, setpass] = useState('')
  async function handlesubmit(e){
    e.preventDefault()
    setspinner('login')
  signInWithEmailAndPassword(auth, mail, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      navigate('/');
      setspinner('notlogin')
    })
    .catch((err) => {
      console.log(err.code);
      console.log(err.message);
    });
  }
  
  return (
    <div>
       {spinner=='login' ? <Spinner data={true}/> :<div className="loginParentDiv">

  
<img width="200px" height="200px" src={Logo}></img>
<form onSubmit={handlesubmit}>
  <label htmlFor="fname">Email</label>
  <br />
  <input onChange={(e)=>{setmail(e.target.value)}}
    className="input"
    type="email"
    id="fname"
    name="email"
  placeholder='email'
  value={mail}
  />
  <br />
 
  <label htmlFor="lname">Password</label>
  <br />
  <input onChange={(e)=>{setpass(e.target.value)}}
    className="input"
    type="password"
    id="lname"
    name="password"
    value={pass}
  />
  <br />
  <br />
  <button>Login</button>
</form>
<button onClick={()=>{navigate('/signup')}}>Signup</button>
</div>}
      
    </div>
  );
}

export default Login;
