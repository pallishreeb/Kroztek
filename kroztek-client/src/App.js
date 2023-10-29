import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";
import AppFooter from "./components/Footer";
import Post from "./pages/post";
import NotFoundPage from './pages/notFoundPage';
import Contact from './pages/contact';
import Navbar from './components/Navbar';
import WhatsappImg from './img/whatsapp.png'
import Header from './components/Header';
import Products from './pages/products';
function App() {
  // const params = useParams()
  return (
    <div className="App">
      <Header/>
      <Navbar />

      <ToastContainer />
<div className='app-container'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/post/:id" element={<Post />} />
        <Route exact path="/post/category/:categoryId/:name" element={<Products />} />
        <Route exact path="/post/subcategory/:subcategoryId/:subname" element={<Products />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      </div>
      <div class="whatsapp-button" style={{
        position: `fixed`,
        top:650,
        right:30,       
        }}>
        <a href="https://wa.me/+918637214899" target="_blank" rel="noopener noreferrer">
        <img src={WhatsappImg} alt="WhatsApp Icon" width={60} height={60}/>
        </a>
    </div>
      <AppFooter />
     
    </div>
  );
}

export default App;
