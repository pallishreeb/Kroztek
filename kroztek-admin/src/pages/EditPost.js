/** @format */

import React, { useState, useContext, useEffect } from "react";
import { AddNav, ImageUpload, FirstStep, SecondStep } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthProvider";
import { PostContext } from "../context/PostProvider";
import FormLoading from "../components/cards/FormLoading"

function EditPost() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { isAuthenticated, token } = authContext;
  const postContext = useContext(PostContext);
  const {
    getSinglePost,
    updatePost,
    loading,
    editForm, setEditForm, imgs, setImgs, selectedImages,
    setSelectedImages
  } = postContext;
  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated, token]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (id) {
      getSinglePost(id, token);
    }
  }, [id]);


  const handleUpdate = () => {
    updatePost(editForm, imgs, token, navigate);
  };
  if (loading) {
    return <FormLoading />;
  }

  return (
    <div className="container-fluid  pt-3   panel">
      <div
        className="row mt-3"
        style={{
          justifyContent: "center",
        }}
      >
        <div
          className="col-sm-12 col-md-12 col-lg-9 "
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            color: "#511",
          }}
        >
          <div className="card">
            <div className="card-body">Edit Blog</div>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-9 mt-2">
          <div className="card">
            <div className="card-title">
              <AddNav value={value} setValue={setValue} />
            </div>
            <div className="card-body overflow-auto">
              <FirstStep
                setForm={setEditForm}
                form={editForm}
                token={token}
                value={value}
              />
              <SecondStep setForm={setEditForm} form={editForm} value={value} />
              <ImageUpload
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                imgs={imgs}
                setImgs={setImgs}
                value={value}
              />

              <div
                className="p-3"
                style={{
                  justifyContent: "flex-end",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <button
                  disabled={loading ? true : false}
                  className="btn btn-secondary"
                  onClick={() => handleUpdate()}
                >
                  {loading ? "Processing" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
