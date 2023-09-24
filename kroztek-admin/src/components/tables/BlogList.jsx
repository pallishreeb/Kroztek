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
import { APP_URL } from "../../config";

export default function BlogTable({ token }) {
  const postContext = useContext(PostContext);
  const { posts, deleteSinglePost, setPosts, loading } = postContext;
  const [selectedRows, setselectedRows] = useState([]);

  const columns = [
    {
      field: "Image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {params.row.images.length > 0 && (
              <img
                src={params.row.images[0]}
                style={{
                  height: "45px",
                  width: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="img-thumb"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 170,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>{params.row.title}</span>
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 120,

      renderCell: (params) => {
        return <span>{params.row.category.categoryName}</span>;
      },
    },
    {
      field: "subcategory",
      headerName: "SubCategory",
      width: 120,
      renderCell: (params) => {
        return <span>{params.row.subcategory?.subcategoryName}</span>;
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 80,
    },
    {
      field: "model",
      headerName: "Model",
      width: 80,
    },
    {
      field: "youtubeLink",
      headerName: "YouTubeLink",
      width: 130,
    },
    {
      field: "websitesLink",
      headerName: "WebsitesLink",
      width: 130,
      renderCell: (params) => {
        return <span>{params.row.websitesLink}</span>;
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
              to={`/edit/${params.row._id}`}
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
      posts.find((row) => row._id === id)
    );
    setselectedRows(selectedRowsData);
  };
  const deleteHandler = () => {
    selectedRows.forEach((item) => {
      console.log("itemToDelete", item._id);
      setPosts(posts.filter((row) => row._id !== item._id));
      deleteSinglePost(token, item._id);
    });
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
        rows={posts}
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
