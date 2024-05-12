import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile
} from "firebase/auth";
import { Firebase } from '../../config/config';
import { collection, getDoc, doc, getDocs, addDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';

import { getFirestore } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [password, setpassword] = useState('')
  const auth = getAuth(Firebase);
  const db = getFirestore(Firebase);
  async function handlesubmit(e) {
    e.preventDefault()
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(phone)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: username,
         
        });
      }).then(async() => {
        // Define the collection and document data
        const myCollection = collection(db, 'myCollection');
        const myDocumentData = {
          name:username,
          email:email,
          phone:phone,
          password:password
        };

        // Add the document to the collection
        const newDocRef = await addDoc(myCollection, myDocumentData);
      }).then(()=>{
        navigate('/')
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });

  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlesubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input onChange={(e) => { setusername(e.target.value) }}
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input onChange={(e) => { setemail(e.target.value) }}
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input onChange={(e) => { setphone(e.target.value) }}
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input onChange={(e) => { setpassword(e.target.value) }}
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
          />
          <br />
          <br />
          <button onClick={() => { navigate('/signup') }}>Signup</button>
        </form>
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
}
