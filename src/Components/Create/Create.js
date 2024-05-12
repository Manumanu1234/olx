import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { Autcontext } from '../../context/context';
import { Firebase } from '../../config/config';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const storage = getStorage(Firebase);
  const db = getFirestore(Firebase);
  const {user,setuser}=useContext(Autcontext)
  const [username, setusername] = useState('')
  const [category, setcatogory] = useState('')
  const [price, setprice] = useState('')
  const [imgurl, setimg] = useState('')
   const navigate=useNavigate()


 async function handlesubmit(){
   console.log(user.uid,username,category,price,imgurl.name);
  
   if (!imgurl) return;
   const storageRef =await ref(storage, `files/${imgurl.name}`);
   uploadBytesResumable(storageRef, imgurl).then((snapshot)=>{
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      console.log(downloadURL);
      return downloadURL
     }).then((downloadURL)=>{
      alert("image uploaded sucess fully");
      return  downloadURL
      
     }).catch((err)=>{
      alert(err);
     }).then((downloadURL)=>{
      let date=Date.now()
      const myCollection = collection(db, 'product');
      const myDocumentData = {
        username,
        category,
        price,
        downloadURL,
        userid:user.uid,
        createdAt:date.toString()
      };
       addDoc(myCollection, myDocumentData).then(()=>{
        console.log("uploaded sucess");
        navigate('/');
       })

     })
   });
  
   

  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
       
            <label htmlFor="fname">Name</label>
            <br />
            <input onChange={(e)=>{
              setusername(e.target.value)
            }}
              className="input"
              type="text"
              id="fname"
              name="Name"
              
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input onChange={(e)=>{setcatogory(e.target.value)}}
              className="input"
              type="text"
              id="fname"
              name="category"
      
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input onChange={(e)=>{setprice(e.target.value)}} className="input" type="number" id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={imgurl ? URL.createObjectURL(imgurl):''}></img>
          
            <br />
            <input onChange={(e)=>{setimg(e.target.files[0])}} type="file" />
            <br />
            <button onClick={handlesubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
