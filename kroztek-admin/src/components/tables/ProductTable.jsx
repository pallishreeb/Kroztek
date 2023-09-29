/** @format */

import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LoadingTable from "./Loading";
import {
  Delete,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { PostContext } from "../../context/PostProvider";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { APP_URL,IMG_URL } from "../../config";

export default function ProductTable({ token }) {
  const postContext = useContext(PostContext);
  const {  deleteSinglePost, loading ,products ,setProducts} = postContext;
  const [selectedRows, setselectedRows] = useState([]);
  const columns = [
    {
      field: "Image",
      headerName: "Image",
      width: 130,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {params.row?.images?.length > 0 && (
              <img
                src={`${IMG_URL}/images/${params.row?.images[0]}`}
                style={{
                  height: "45px",
                  width: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin:"20px"
                }}
                alt="img-thumb"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>{params.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 190,

      renderCell: (params) => {
        return <span>{params.row.category.categoryName}</span>;
      },
    },
    {
      field: "subcategory",
      headerName: "SubCategory",
      width: 190,
      renderCell: (params) => {
        return <span>{params.row.subcategory?.subcategoryName}</span>;
      },
    },
    {
      field: "documents",
      headerName: "Document",
      width: 220,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <p>{params.row?.documents[0]}</p>
           
          </div>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link
              to={`/edit-product/${params.row._id}`}
              style={{
                color: "#green",
              }}
            >
              <EditOutlined />
            </Link>
            {/* <DeleteOutline
            sx={{
              color:"red"
            }}
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            /> */}
          </div>
        );
      },
    },
    {
      field: "view",
      headerName: "view",
      width: 80,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link
              to={`${APP_URL}/post/${params.row._id}`}
              style={{
                color: "#green",
              }}
            >
              <RemoveRedEyeOutlined />
            </Link>
          </div>
        );
      },
    },
  ];

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
    products.find((row) => row._id === id)
    );
    setselectedRows(selectedRowsData);
  };
  const deleteHandler = () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
    selectedRows.forEach((item) => {
      setProducts(products.filter((row) => row._id !== item._id));
      deleteSinglePost(token, item._id);
    });
  }
  };
  if (loading) {
    return <LoadingTable />;
  }
  return (
    <div style={{ height: "600px", width: "100%", background: "#ffffff" }}>
      {selectedRows.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Tooltip title="Delete" onClick={() => deleteHandler()}>
            <IconButton size="lg">
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <DataGrid
        getRowId={(r) => r._id}
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        rowHeight={80}
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </div>
  );
}
