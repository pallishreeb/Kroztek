/** @format */

import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, EditOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LoadingTable from "./Loading";
export default function SubCategoryTable({
  setSubcategories,
  subcategories,
  setSubcategory,
  setCategory,
  SetOpen,
  setName,
  removeSubcategory,
  token,
  loading,
}) {
  const [selectedRows, setselectedRows] = useState([]);
  const columns = [
    {
      field: "subcategoryName",
      headerName: "Name",
      width: 100,
    },
    {
      field: "categoryId",
      headerName: "CategoryName",
      width: 130,
      renderCell: (params) => {
        return <span>{params?.row.categoryId?.categoryName}</span>;
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 50,
      renderCell: (params) => {
        return (
          <div
            onClick={() => {
              setCategory(null);
              setSubcategory(params.row);
              setName("Update SubCategory");
              SetOpen(true);
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
      subcategories.find((row) => row._id === id)
    );
    setselectedRows(selectedRowsData);
  };
  const deleteHandler = () => {
    selectedRows.forEach((item) => {
      //   console.log("itemToDelete",item._id);
      setSubcategories(subcategories.filter((row) => row._id !== item._id));
      removeSubcategory(item._id, token);
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
        rows={subcategories}
        columns={columns}
        pageSize={5}
        rowHeight={60}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick={true}
        getRowId={(r) => r._id}
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </div>
  );
}
