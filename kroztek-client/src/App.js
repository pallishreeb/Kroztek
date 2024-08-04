import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// import Home from "./pages/home";
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
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import VerifyEmail from './pages/VerifyEmail';
import Cart from './pages/cartPage';
import Checkout from './pages/checkout';
import ProtectedRoute from './components/ProtectedRoute';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
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
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/" element={<Navigate to="/products/CG" />}/>
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route exact path="/verifyEmail" element={<VerifyEmail />} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
        <Route exact path="/requirement/:formType" element={<Contact />} />
        <Route exact path="/products/:brand" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/service/:id" element={<ServiceDetails />} />
        <Route exact path="/myorders" element={<ProtectedRoute element={<MyOrders />} />} />
        <Route exact path="/order/:orderId" element={<ProtectedRoute element={<OrderDetails />} />} />
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
