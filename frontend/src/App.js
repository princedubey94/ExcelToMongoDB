import React from 'react'
import Home from './Home'
import {Link, Routes, Route, useNavigate,BrowserRouter} from 'react-router-dom';
import Success from './Success'
import Heading from './Heading';
import Error from './Error';
import ServerError from './serverError';

const App = () => {
  return (
    <div>
    <Heading />
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/serverError" element={<ServerError/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
    </BrowserRouter>    
    </div>
  )
}

export default App
