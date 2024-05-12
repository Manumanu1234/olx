import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { Productcontext } from '../../context/productcontext';
import { Firebase } from '../../config/config';
import { collection, getCountFromServer, getFirestore, query, where } from 'firebase/firestore';
function View() {
  const {productdetails,setproduct} = useContext(Productcontext)
   const [userdetails, setuserdetails] = useState(null)
  useEffect(async() => {
 
    const db=getFirestore(Firebase);
    const mycol = collection(db, 'myCollection');
    const inventoryQuery = query(
      mycol,
      where('id', '==', productdetails.userid),
    );
    const snapshot = await getCountFromServer(inventoryQuery);
    console.log(snapshot)
    const totalItemsInAllCarts = snapshot.data().count;
    console.log(totalItemsInAllCarts)
  }, [])
  


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productdetails.downloadURL}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productdetails.price} </p>
          <span>{productdetails.username}</span>
          <p>{productdetails.catogory}</p>
          <span>{productdetails.date}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
