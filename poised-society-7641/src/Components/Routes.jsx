import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Home/Main";

import NotFound from "./NotFound";

import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";





function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
     
    
   
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    
    
  
     
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default AllRoutes;
