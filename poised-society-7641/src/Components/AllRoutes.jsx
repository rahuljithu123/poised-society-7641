
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp"
import SignIn from "./SignIn"
let AllRoutes = () =>{
    return( <Routes>
         <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Routes>)
}

export default AllRoutes