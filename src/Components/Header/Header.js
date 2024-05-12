import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Autcontext } from '../../context/context';
import { getAuth,signOut } from "firebase/auth";
import { Firebase } from '../../config/config';
import { useNavigate } from 'react-router-dom';
function Header() {
 const auth=getAuth(Firebase)
 let navigate=useNavigate()
  const {user,setuser} = useContext(Autcontext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? user.displayName :'Login'}
          <br/>
          {user && <span onClick={()=>{
            signOut(auth).then(()=>{navigate('/login')})
          }}>Logout</span>}
          <hr />
        </div>

        <div onClick={()=>{
          navigate('/sell')
        }} className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
