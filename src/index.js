import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from './context/context';
import { Post } from './context/productcontext';
ReactDOM.render(
    <Context>
        <Post>
        <App />    
        </Post>

    </Context>
    
, document.getElementById('root'));
