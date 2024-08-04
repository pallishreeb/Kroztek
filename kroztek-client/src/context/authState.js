import { useReducer, useEffect, useContext } from "react";
import AuthContext from "./index";
import authReducer from "./authReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { API_URL } from "../config";
import {
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    VERIFY_FAIL,
    VERIFY_SUCCESS,
} from "./constants";

const AuthState = ({ children }) => {
    const navigate = useNavigate()
    const initialState = {
        user: null,
        token: null,
        isAuthenticated: null,
        isRegistered: false,
        isverified: false,
        cart: [],  // Added cart state
    };
    const [state, dispatch] = useReducer(authReducer, initialState);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userString = localStorage.getItem("user");
        const cartString = localStorage.getItem("cart");
    
        const user = userString ? JSON.parse(userString) : null;
        const cart = cartString ? JSON.parse(cartString) : []; // Ensure cart is an array
    
        if (token && !state.token) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: JSON.parse(token),
            });
        }
    
        if (user && !state.user) {
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: user,
            });
        }
    
        if (user && !cartString) {
            console.log(user?._id);
            fetchCartDetails(user?._id).then((res) => {
                if (res) {
                    dispatch({
                        type: 'LOAD_CART',
                        payload: res.products || [], // Ensure it's an array
                    });
                    localStorage.setItem("cart", JSON.stringify(res.products || []));
                }
            });
        } else {
            dispatch({
                type: 'LOAD_CART',
                payload: cart, // Use the cart from localStorage
            });
        }
    }, [state.token, state.user]);
    
    
    const loadUser = async (token) => {
        const config = {
            headers: {
                authorization: `${token}`,
            },
        };
        try {
            const res = await axios.get(`${API_URL}/user/singleUser`, config);
            localStorage.setItem("user", JSON.stringify(res.data.response));
            dispatch({ type: LOAD_USER_SUCCESS, payload: res.data.response });
            let userId = res.data?.response?._id
             // Sync local cart with backend
            await syncCartWithBackend(userId).then((res) =>{
                if(res){
                    fetchCartDetails(userId).then((res) =>{
                        dispatch({
                            type: 'LOAD_CART',
                            payload: res,
                        });
                    })
                }
            }).catch((error) =>{
                console.error(error,"error in updating cart");
            });
           
           
        } catch (error) {
            toast(error.response.data.message);
            dispatch({ type: LOAD_USER_FAIL });
        }
    };

    const login = async (formData) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(`${API_URL}/user/login`, formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.token,
            });
            localStorage.setItem("token", JSON.stringify(res.data.token));
            loadUser(res.data.token);
            
            navigate('/')
        } catch (error) {
            toast.error(
                error.response?.data?.message
                    ? error.response.data.message
                    : "Try again later"
            );
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    const register = async (formData, navigate) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(
                `${API_URL}/user/register`,
                formData,
                config
            );
            localStorage.setItem("emailToVerify", formData.email);
            dispatch({ type: REGISTER_SUCCESS });
            navigate('/verifyEmail')
        } catch (error) {
            toast.error(
                error.response?.data?.email
                    ? error.response.data.email
                    : "Try again later"
            );
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.message,
            });
        }
    };

    const verifyEmail = async (data, navigate) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(`${API_URL}/user/verifyEmail`, data, config);
            toast.success(res.data.message);
            localStorage.removeItem("emailToVerify");
            dispatch({ type: VERIFY_SUCCESS });
            navigate('/login')
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch({ type: VERIFY_FAIL });
        }
    };

    const Update = async (data, token) => {
        try {
            const config = {
                headers: {
                    "Authorization": `${token}`, // Correct format
                },
            };
            const res = await axios.put(`${API_URL}/user/editDetails`, data, config);
            toast.success(res.data.message);
            loadUser(token);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    
    const forgotPassword = async (data) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(`${API_URL}/user/sendOTP`, data, config);
            toast.success(res.data.message);
            localStorage.setItem("emailToVerify", data.email);
            dispatch({ type: VERIFY_SUCCESS });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const resetPassword = async (data) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const res = await axios.post(
                `${API_URL}/user/updatePassword`,
                data,
                config
            );
            toast.success(res.data.message);
            localStorage.setItem("emailToVerify", data.email);
            dispatch({ type: VERIFY_SUCCESS });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    const addToCart = async (product) => {
        const user = JSON.parse(localStorage.getItem("user"));
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const userId = user?._id;
    
        const existingProduct = cart.find(item => item._id === product._id);
    
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
    
        if (userId) {
            try {
                const response = await fetch(`${API_URL}/cart/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId,
                        productId: product._id,
                        quantity: existingProduct ? existingProduct.quantity : 1
                    })
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update cart in backend');
                }
    
                const updatedCart = await response.json();
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: updatedCart.products || [],
                });
    
                toast.success('Item added to cart!');
            } catch (error) {
                console.error(error);
                toast.error('Failed to add item to cart');
            }
        } else {
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart,
            });
        }
    };
    const syncCartWithBackend = async (userId) => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    
        try {
            const response = await fetch(`${API_URL}/cart/sync`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    cart: localCart
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to sync cart with backend');
            }
    
            const updatedCart = await response.json();
            dispatch({
                type: 'ADD_TO_CART',
                payload: updatedCart.products || [],
            });

            toast.success('Cart synced with backend!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to sync cart with backend');
        }
    };
        
    
    const removeFromCart = async (productId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const userId = user?._id;
    
        cart = cart.filter(item => item._id !== productId);
    
        localStorage.setItem("cart", JSON.stringify(cart));
    
        if (userId) {
            try {
                const response = await fetch(`${API_URL}/cart/remove`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId,
                        productId
                    })
                });
    
                if (!response.ok) {
                    throw new Error('Failed to remove item from cart in backend');
                }
    
                const updatedCart = await response.json();
                dispatch({
                    type: 'REMOVE_FROM_CART',
                    payload: updatedCart.products || [],
                });
    
                toast.success('Item removed from cart!');
            } catch (error) {
                console.error(error);
                toast.error('Failed to remove item from cart');
            }
        } else {
            dispatch({
                type: 'REMOVE_FROM_CART',
                payload: cart,
            });
        }
    };
    
    
    const fetchCartDetails = async (userId) => {
        try {
            const response = await fetch(`${API_URL}/cart/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch cart details');
            }
    
            const cart = await response.json();
            return cart || { products: [] }; // Ensure cart is always an object with products
        } catch (error) {
            console.error(error);
            return { products: [] }; // Return a default value
        }
    };

    const placeOrder = async (orderData) => {
        try {
          const response = await fetch(`${API_URL}/order/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          });
    
          if (!response.ok) {
            throw new Error('Failed to place order');
          }
    
          fetchCartDetails(orderData.userId).then((res) =>{
            dispatch({
                type: 'LOAD_CART',
                payload: res,
            });
        })
          return response.json();
        } catch (error) {
          console.error(error);
          throw error;
        }
      };
      const getOrdersByUser = async (userId) => {
        try {
          const response = await axios.get(`${API_URL}/order/user/${userId}`);
          return response.data;
        } catch (error) {
          console.error('Failed to fetch orders:', error);
          throw error;
        }
      };
    
      const getOrder = async (orderId) => {
        try {
          const response = await axios.get(`${API_URL}/order/${orderId}`);
          return response.data;
        } catch (error) {
          console.error('Failed to fetch order:', error);
          throw error;
        }
      };
    
    const logout = () => {
        dispatch({ type: LOGOUT });
         // Redirect to login page
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                isRegistered: state.isRegistered,
                isverified: state.isverified,
                cart: state.cart,
                addToCart,
                removeFromCart,
                placeOrder,
                getOrdersByUser,
                fetchCartDetails,
                getOrder,
                login,
                logout,
                loadUser,
                register,
                verifyEmail,
                Update,
                forgotPassword,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;

export const useAuthApi = () => useContext(AuthContext);
