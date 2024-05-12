import {React,CSSProperties} from 'react'
import { ClipLoader } from 'react-spinners';
import './Spinner.css'

function Spinner(props) {
 
  return (
    <div className="sweet-loading centered  ">
    <ClipLoader
      color={'black'}
      loading={props.data}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
  );
}

export default Spinner;
