import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Firebase } from '../../config/config';
import { useNavigate } from 'react-router-dom';
import { Productcontext } from '../../context/productcontext';

function Posts() {
  const {productdetails,setproduct}=useContext(Productcontext)
  const navigate=useNavigate()
var proarr = []
 const [newarr, setnewarr] = useState([])
  useEffect(async () => {
    const db = getFirestore(Firebase);
    const product = collection(db, "product");
    const docsSnap = await getDocs(product);
     
    docsSnap.forEach(doc => {
      console.log(doc.data());
      proarr.push(doc.data())
    })
    console.log("hii");
    console.log(proarr)
    setnewarr(proarr);
  }, [])



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {
            newarr.map((elem) => {
              return (
                <div className="card" onClick={()=>{
                  setproduct(elem)
                  navigate('/view')}}>
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={elem.downloadURL} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {elem.price}</p>
                    <span className="kilometer">{elem.catogory}</span>
                    <p className="name">{elem.username}</p>
                  </div>
                  <div className="date">
                    <span>{elem.createdAt}</span>
                  </div>
                </div>
              )

            })
          }



        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
