/** @format */

import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { EditOutlined, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LoadingTable from "./Loading";
export default function CategoryTable({
  setCategories,
  categories,
  setCategory,
  setSubcategory,
  setOpen,
  setName,
  removeCategory,
  token,
  loading,
}) {
  const [selectedRows, setselectedRows] = useState([]);
  const columns = [
    {
      field: "categoryName",
      headerName: "Name",
      width: 150,
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 60,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => {
              setSubcategory(null);
              setCategory(params.row);
              setName("Update Category");
              setOpen(true);
            }}
          >
            <EditOutlined />
          </div>
        );
      },
    },
  ];
  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      categories.find((row) => row._id === id)
    );
    setselectedRows(selectedRowsData);
  };
  const deleteHandler = () => {
    selectedRows.forEach((item) => {
      // console.log("itemToDelete", item._id);
      setCategories(categories.filter((row) => row._id !== item._id));
      removeCategory(item._id, token);
    });
  };

  if (loading) {
    return <LoadingTable />;
  }
  return (
    <div style={{ height: 400, width: "100%", background: "#ffffff" }}>
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
        rows={categories}
        columns={columns}
        pageSize={5}
        rowHeight={60}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(r) => r._id}
        disableRowSelectionOnClick={true}
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </div>
  );
}
