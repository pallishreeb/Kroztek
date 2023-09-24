import { useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Blogs from "./pages/Blogs"
import AddPost from "./pages/AddPost"
import EditPost from "./pages/EditPost"
import Login from "./pages/Login"
import { Box } from '@mui/material';
import { Nav, Topbar } from "./components/index";
import { createMedia } from '@artsy/fresnel';
import Category from './pages/Category';
import Users from './pages/Users'
import { AuthContext } from './context/auth/AuthProvider';
import Metadata from './pages/Metadata';
import DisplayMetadata from './pages/DisplayMetadata';

function App() {
  const { isAuthenticated } = useContext(AuthContext)
  const { MediaContextProvider, Media } = createMedia({
    // breakpoints values can be either strings or integers
    breakpoints: {
      sm: 0,
      md: 550,
      lg: 1024,

    },
  })
  return (



    <div className='bg-light' style={{ height: "100%", width: "100vw" }}>

      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <Router>

        <MediaContextProvider>
          <Media at='sm'>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {isAuthenticated && <Topbar />}
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/add' element={<AddPost />} />
                <Route path='/edit/:id' element={<EditPost />} />
                <Route path='/posts' element={<Blogs />} />
                <Route path='/users' element={<Users />} />
                <Route path='/categories' element={<Category />} />
                <Route path='/metadata' element={<Metadata />} />
                <Route path='/showmetadata' element={<DisplayMetadata />} />
                <Route path='/metadata/:metadataId' element={<Metadata />} />
                <Route path='/login' element={<Login />} />

              </Routes>
            </Box>

          </Media>
          <Media at='md'>
            <Box sx={{ display: "flex", gap: "1.5rem" }}>
              {isAuthenticated && <Nav active={false} />}
              <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/add' element={<AddPost />} />
                <Route path='/edit/:id' element={<EditPost />} />
                <Route path='/posts' element={<Blogs />} />
                <Route path='/users' element={< Users />} />
                <Route path='/categories' element={<Category />} />
                <Route path='/metadata' element={<Metadata />} />
                <Route path='/showmetadata' element={<DisplayMetadata />} />
                <Route path='/metadata/:metadataId' element={<Metadata />} />
                <Route path='/login' element={<Login />} />

              </Routes>
            </Box>
          </Media>
          <Media greaterThanOrEqual="lg">
            <Box sx={{ display: "flex", gap: "1.5rem" }}>
              {isAuthenticated && <Nav active={true} />}
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/add' element={<AddPost />} />
                <Route path='/edit/:id' element={<EditPost />} />
                <Route path='/posts' element={<Blogs />} />
                <Route path='/users' element={<Users />} />
                <Route path='/categories' element={<Category />} />
                <Route path='/metadata' element={<Metadata />} />
                <Route path='/showmetadata' element={<DisplayMetadata />} />
                <Route path='/metadata/:metadataId' element={<Metadata />} />
                <Route path='/login' element={<Login />} />

              </Routes>

            </Box>
          </Media>
        </MediaContextProvider>
      </Router>


    </div>



  );
}

export default App;
