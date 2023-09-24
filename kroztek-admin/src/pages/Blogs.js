import React, { useContext, useEffect } from 'react'
import { Add } from '@mui/icons-material';
import { BlogTable } from '../components';
import { AuthContext } from '../context/auth/AuthProvider';
import { PostContext } from "../context/PostProvider"
import { useNavigate } from "react-router-dom"
const Blogs = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { isAuthenticated, token, } = authContext;
    const postContext = useContext(PostContext);
    const { getAllPosts, posts } = postContext
    useEffect(() => {
        !isAuthenticated && navigate("/login")
    }, [isAuthenticated, token])
    useEffect(() => {
        getAllPosts(token)
    }, [posts.length])
    return (
        <div className='container-fluid mt-5'>
            <div style={{ background: " #ffffff", color: "#525", position: "relative", padding: "5px 15px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem" }}>
                <span style={{ fontWeight: "bolder", fontSize: "1.7rem" }}>Blogs</span>
                <button onClick={() => navigate("/add")} type="button" class="btn " style={{ borderColor: "#511", display: "flex", gap: "10px", color: "#511", alignItems: "center", justifyContent: "space-between" }}>
                    <Add />
                    Add Blog</button>
            </div>
            <BlogTable token={token} />
        </div>
    );
}

export default Blogs