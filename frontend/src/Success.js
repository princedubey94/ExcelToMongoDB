import React from 'react'
import "./success.css"
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom'; 


const Success = () => {
  return (
    <>
      <div className="card">
      <div className="circle-container">
        <i className="checkmark">✓</i>
      </div>
      <h1 className='head'>Thank You!</h1>
      <p>File Successfully Uploaded.<br /> <br/>Your records will processed shortly.</p>

      <br/><br/>
      <Link to="/">
      <Button sx={{backgroundColor:'#88B04B'
  }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
  Upload more files
</Button>
      </Link>
    </div>
    </>
    


  );
}

export default Success