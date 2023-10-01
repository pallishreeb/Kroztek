import React, { useState, useEffect, useContext } from "react";
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth/AuthProvider';
import { CategoryContext } from "../context/CategoryProvider";

function CategoryPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isAuthenticated, token } = authContext;
  const categoryContext = useContext(CategoryContext);
  const {
    getAllCategories,
    updateCategory,
    removeCategory,
    createCategory,
    categories,
    loading,
  } = categoryContext;

  // State for category input field
  const [categoryName, setCategoryName] = useState("");

  // State for currently editing category (if any)
  const [editingCategory, setEditingCategory] = useState(null);
  

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      getAllCategories(token);
    }
  }, [isAuthenticated, token, categories?.length, categoryName]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName) return; // Prevent empty submissions

    // Check if we are editing an existing category
    if (editingCategory !== null) {
      // Update the category in your context
      let form = {
        categoryId : categories[editingCategory]._id,
        categoryName
      }
      updateCategory(form, token);
      setCategoryName("");
      setEditingCategory(null);
    } else {
      // Add a new category to your context
      createCategory(categoryName, token );
      setCategoryName("");
    }
  };

  // Function to handle category edit
  const handleEdit = (index) => {
    setCategoryName(categories[index].categoryName);
    setEditingCategory(index);
  };

  // Function to handle category deletion
  const handleDelete = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this item,products and subcategory related to this product will also be removed?");
    if (confirmed) {
    // Remove the category from your context
    removeCategory(categories[index]._id, token);
    }
  };

  return (
    <Container className="container mt-5">
      <h2>Add/Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button className="mt-2" type="submit" variant="contained" color="primary">
          {editingCategory !== null ? "Update" : "Add"}
        </Button>
      </form>

      <h2 className="mt-3">Categories</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? <h3>Loading..</h3> : <>
            {categories.map((category, index) => (
              <TableRow key={category._id}>
                <TableCell>{category.categoryName}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            </>}
           
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CategoryPage;
