import React, { useEffect, useContext, useState } from 'react'
import { HeaderCard } from '../components';
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/auth/AuthProvider';
import { PostContext } from "../context/PostProvider"
import { BlogTable } from '../components';
import { getStatisticsData } from "../apis/post"
const Home = () => {

  const navigate = useNavigate();
  const [statistics, setStatistics] = useState(null)
  const authContext = useContext(AuthContext);
  const { isAuthenticated, token } = authContext;
  const postContext = useContext(PostContext);
  const { getAllPosts, posts } = postContext;
  useEffect(() => {
    !isAuthenticated && navigate("/login")
  }, [isAuthenticated, token])

  useEffect(() => {
    getAllPosts(token)
  }, [posts.length])

  useEffect(() => {
    getStatisticsData(token).then((res) => {
      // console.log("statistic response", res.data)
      setStatistics(res.data)
    }).catch((error) => {
      console.log("Error", error?.message || "")
    })
  }, [])
  return (
    <div className='container-fluid mx-2 pt-2  panel' style={{
      position: "relative"
    }} >
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xs-7">
          <div style={{ borderBottom: "2px solid #511", padding: "0.9rem 1.3rem", fontSize: "2rem", fontWeight: "bolder", color: "#511" }}>
            Dashboard
          </div>
        </div>
        <HeaderCard statistics={statistics} />
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className='row mt-4 pt-3' style={{ gap: "3rem", justifyContent: "flex-start", alignItems: "center", background: "#fff", borderRadius: "0.7em !important", marginLeft: "0.2rem", marginRight: "0.7rem" }}>
            <BlogTable token={token} />
          </div>
        </div>
      </div>



    </div>


  );
}

export default Home