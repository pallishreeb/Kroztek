/** @format */

import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getCategories, getSubCategories } from "../../apis/category";
import FormLoading from "../cards/FormLoading";
const FirstStep = ({ token, value, setForm, form }) => {
  // console.log(form);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    getCategoryAndSubcategory(categoryId, token);
  }, [categoryId, token]);

  const getCategoryAndSubcategory = (categoryId, token) => {
    setCategoryLoading(true);
    getCategories(token)
      .then((res) => {
        setCategories(res.data.response);
        setCategoryLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    if (categoryId) {
      setCategoryLoading(true);
      getSubCategories(categoryId, token)
        .then((res) => {
          setSubcategories(res.data.response);
          setCategoryLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  let display = value === 0 ? "" : "none";

  if (categoryLoading) {
    return <FormLoading />;
  }
  return (
    <div className="p-3" style={{ display: display }}>
      <div className="row ">
        <div className="col-lg-12 col-md-12">
          <TextField
            id="filled-basic"
            label="Blog Title"
            variant="filled"
            required
            fullWidth
            name="title"
            value={form?.title || ""}
            onChange={(e) => {
              console.log(form);
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div
        className="row mt-4"
        style={{
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <div className="col-sm-12 col-md-6 col-lg-6">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categories}
            getOptionLabel={(option) => option?.categoryName}
            value={form?.category}
            onChange={(_, newValue) => {
              setCategoryId(newValue?._id);
              setForm({
                ...form,
                categoryId: newValue._id,
              });
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Choose Category" />
            )}
          />
        </div>
        <div className="col-sm-12 col-md-5 col-lg-5 ">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={subcategories}
            getOptionLabel={(option) => option?.subcategoryName}
            value={form?.subcategory}
            onChange={(_, newValue) => {
              setForm({
                ...form,
                subcategoryId: newValue._id,
              });
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Choose SubCategory" />
            )}
          />
        </div>
      </div>
      <div className="row pt-3 mb-5">
        <ReactQuill
          theme={"snow"}
          value={form.text || ""}
          onChange={(event) =>
            setForm({
              ...form,
              text: event,
            })
          }
        />
      </div>
    </div>
  );
};

export default FirstStep;
