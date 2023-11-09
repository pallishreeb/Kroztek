import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";
import AppFooter from "./components/Footer";
import ProductDetails from "./pages/productDetails";
import ServiceDetails from "./pages/serviceDeatils";
import NotFoundPage from './pages/notFoundPage';
import Contact from './pages/contact';
import Navbar from './components/Navbar';
import WhatsappImg from './img/whatsapp.png'
import Header from './components/Header';
import Products from './pages/products';
import Services from "./pages/services";
import ScrollButton from './components/ScrollButton';

function App() {
  return (
    <div className="App">
      <div className='top-navs' id="target-section">

      <Header/>
      <Navbar />
      </div>
   

      <ToastContainer />
     <div className='app-container'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/requirement/:formType" element={<Contact />} />
        <Route exact path="/products/:brand" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/service/:id" element={<ServiceDetails />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      </div>
     <ScrollButton/>
      <div class="whatsapp-button" style={{
        position: `fixed`,
        top:670,
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
