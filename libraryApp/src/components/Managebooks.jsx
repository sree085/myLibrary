import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './Managebooks.css';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  var navigate= useNavigate()

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://mylibrary-iabe.onrender.com/book');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`https://mylibrary-iabe.onrender.com/removebook/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  function valueupdate(val) {
    navigate('/addbook',{state:{val}})   //state:{val} is the props
  }

  return (
    <div className='managebContainer'>
    
    <Box sx={{ padding: 4, maxWidth: '1200px', margin: '0 auto', backgroundColor: '#F9F9F9', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{marginTop:'5%'}}>
        Manage Books
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(book => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.status}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteBook(book._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="info" onClick={() => valueupdate(book)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </div>
  );
};

export default ManageBooks;
