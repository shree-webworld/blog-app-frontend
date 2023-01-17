import { useState } from 'react'
import Login from "./pages/Login";
import {Routes, Route, Outlet, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Blog from "./pages/blog";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";


const PrivateRoutes = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated || token ?
    <>
      <Navbar />
      <Outlet />
    </> : <Navigate replace to="/" />
};



function App()
{
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return(<>
            <Routes>

              <Route path="/" element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
              <Route path="/signup" element={<Signup/>} />

              <Route element={ <PrivateRoutes isAuthenticated={isAuthenticated}/> }>
                <Route path="/blog" element={<Blog />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:postId" element={<SinglePost />} />
              </Route>

            </Routes>
         </>)
}

export default App
