import React, { useContext } from 'react';
import './App.css';

/**
 * ?  =====Import Components=====
 */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import Login from "./Pages/Login"
import { Autcontext } from './context/context';
import { getAuth, onAuthStateChanged } from "firebase/auth";
 import { Firebase } from './config/config';
import Spinner from './Components/Spinner/Spinner';

import Create from './Pages/Create'

import ViewPost from './Pages/ViewPost';

function App() {
  const auth = getAuth(Firebase);
  const {user,setuser} = useContext(Autcontext)
  onAuthStateChanged(auth,(user)=>{
    setuser(user)
  })

  return (
    <div>
      <Router>
         <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/sell' element={<Create/>}></Route>
          <Route path='/view' element={<ViewPost/>}></Route>
         </Routes>
       
      </Router>
    </div>
  );
}

export default App;
