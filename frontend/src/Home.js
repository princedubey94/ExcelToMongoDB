import './App.css';
import { useState } from 'react';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import "./home.css"


function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
   const submitExcel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log("hello" + file);
    try {
      await axios.post("http://localhost:3001/upload-files", formData).then(res => {
        console.log("prince");
        if (res.data == "ok") {
          navigate('/success');
        }
        else if (res.data == "unsupported file type") {
          alert("unsupported file format");
        }
        else {
          navigate('/serverError');
        }
      }).catch(e => { })
    }
    catch (e) {
      console.log(e);
    }
  }
    return (
      <div className="App">
        <form
          onSubmit={submitExcel}
          encType='multipart/form-data'
        >
          <div className="drop-container" id="dropcontainer" 
          >
            <FileUploadIcon sx={{ fontSize: 70 }} />
            <span className="drop-title">upload a .xlsx</span>
            or
            <span className="drop-title">.xls file here</span>
            <div className='choose'>
            {!file && <label for="images" className='lab'><AddIcon sx={{fontSize:20}} /><span> Add</span></label>}
            {file && <ClearIcon sx={{marginTop:1.7 ,}} onClick={(e)=>{setFile(null);
            const fileChosen=document.getElementById("file-chosen");
            fileChosen.textContent="No file chosen";
            }}/>}
            <span id="file-chosen">No file chosen</span>
            </div>


            <input type="file" id="images" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              required
              onChange={(e) => {setFile(e.target.files[0]);
                const fileChosen=document.getElementById("file-chosen");
                fileChosen.textContent = e.target.files[0].name}} hidden/>
        
        {file && 
          <button className='btn' type='submit'><CloudUploadIcon sx={{fontSize:20}} />  <span className='btntext'>Upload</span></button>}
             
          
          </div>
        </form>
      </div>
        );
}

export default Home;
