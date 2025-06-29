import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Container, Paper } from '@mui/material';
import axios from 'axios'; // Ensure axios is imported
import { useLocation } from 'react-router-dom';

const Addbook = () => {
  const [book, setbook] = useState({
    id: '',
    title: '',
    author: '',
    year: '',
    genre: '',
    Description: '',
    ISBN: '',
    img: '',
    status: 'available'
  });
  const location=useLocation()
  // function valueFetch(e){
  //   setForm({...form,[e.target.name]:e.target.value})
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setbook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(location.state!=null){
      axios.put('https://mylibrary-iabe.onrender.com/bookedit/'+location.state.val._id,book).then((res)=>{
        alert('Data updated!');
      }).catch((error)=>{
        console.log(error);
      })
    }else{
      try {
        await axios.post('https://mylibrary-iabe.onrender.com/addbook', book);
        alert('Book added successfully');
        setbook({
          id: '',
          title: '',
          author: '',
          year: '',
          genre: '',
          Description: '',
          ISBN: '',
          img: '',
          status: ''
        });
      } catch (error) {
        console.error('Error adding book:', error);
        alert('Failed to add book');
      }
    }
  };
// console.log(location.state);
    useEffect(()=>{
      if(location.state!=null){
        setbook({...book,
          id:location.state.val.id,
          title:location.state.val.title,
          author:location.state.val.author,
          year:location.state.val.year,
          genre:location.state.val.genre,
          Description:location.state.val.Description,
          ISBN:location.state.val.ISBN,
          img:location.state.val.img,
          status:location.state.val.status
      })
      }
    },[])

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://img.freepik.com/premium-photo/blur-library-background_882595-4867.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container component="main" maxWidth="sm" sx={{ margin: '5%' }}>
        <Paper elevation={6} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 3 }}>

          {
          location.state==null?
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#333' }}>Add New Book</Typography>:
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#333' }}>Update Book</Typography>
          }

          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              label="Book Id"
              name="id"
              value={book.id}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Book Title"
              name="title"
              value={book.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Author"
              name="author"
              value={book.author}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Book Year"
              name="year"
              value={book.year}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Genre"
              name="genre"
              value={book.genre}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Description ( Optional )"
              name="Description"
              value={book.Description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="ISBN"
              name="ISBN"
              value={book.ISBN}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Image Link"
              name="img"
              value={book.img}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Status"
              name="status"
              value={book.status}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
              select
              SelectProps={{
                native: true,
              }}
            >
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              PROCEED
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Addbook;
