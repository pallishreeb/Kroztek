import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthProvider";
import { CategoryContext } from "../context/CategoryProvider";


function SubcategoryPage() {

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, token } = authContext;
  const subcategoryContext = useContext(CategoryContext);
  const {
    removeSubcategory,
    updateSubcategory,
    createSubcategory,
    allSubcategories,
    categories, // Assuming you have a categories array
    loading,
    subcategories,
    getAllCategories,
  } = subcategoryContext;

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated, token]);

  useEffect(() => {
    getAllCategories(token);
    allSubcategories(token);
  }, [subcategories?.length]);

  // State for subcategory input fields
  const [subcategoryName, setSubcategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  // State for currently editing subcategory (if any)
  const [editingSubcategory, setEditingSubcategory] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subcategoryName || !parentCategory) return; // Prevent empty submissions

    // Check if we are editing an existing subcategory
    if (editingSubcategory !== null) {
      // Update the subcategory
      let form = {
        categoryId: parentCategory,
        subcategoryName: subcategoryName,
        subId: editingSubcategory
    }
    updateSubcategory(form, token)
      setSubcategoryName("");
      setParentCategory("");
      setEditingSubcategory(null);
    } else {
      // Add a new subcategory
      let form = {
        subcategory: subcategoryName,
        categoryId: parentCategory,
       }
    createSubcategory(form, token)
      setSubcategoryName("");
      setParentCategory("");
    }
  };

  // Function to handle subcategory edit
  const handleEdit = (subcategory) => {
    setSubcategoryName(subcategory.subcategoryName);
    setParentCategory(subcategory.categoryId._id);
    setEditingSubcategory(subcategory._id);
  };

  // Function to handle subcategory deletion
  const handleDelete = (subcategory) => {
    // Delete the subcategory in the context
    removeSubcategory(subcategory._id,token);
  };

  return (
    <Container className="container mt-5">
      <h2>Add/Edit Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Subcategory Name"
          variant="outlined"
          fullWidth
          value={subcategoryName}
          onChange={(e) => setSubcategoryName(e.target.value)}
        />
        <InputLabel htmlFor="parent-category">Parent Category</InputLabel>
        <Select
          variant="outlined"
          fullWidth
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          className="mt-2"
        >
          <MenuItem value="">Select Parent Category</MenuItem>
          {categories?.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
        <Button className="mt-2" type="submit" variant="contained" color="primary">
          {editingSubcategory !== null ? "Update" : "Add"}
        </Button>
      </form>

      <h2 className="mt-3">Subcategories</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subcategory Name</TableCell>
              <TableCell>Parent Category</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {loading ? <h3>Loading..</h3> : <>
            {subcategories?.map((subcategory) => (
              <TableRow key={subcategory._id}>
                <TableCell>{subcategory.subcategoryName}</TableCell>
                <TableCell>{subcategory?.categoryId.categoryName}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(subcategory)}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(subcategory)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            </>
}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default SubcategoryPage;
