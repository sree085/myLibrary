import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, CardActions, CardMedia, Grid } from '@mui/material';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [book, setBook] = useState({}); // Use null for the initial state
  const [rows,setRows] = useState({});
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    axios.get('https://projectlibrary-jumw.onrender.com/book/'+id)
      .then((res) => {
        const bookData = res.data.find(row=>row.id == parseInt(id));
        setBook(bookData);
        console.log(bookData);
      })
      .catch((err) => {
        console.error('Error fetching book data:', err);
        setError('Error fetching book data'); // Set error state
      });
  }, [id]);

  if (error) {
    return <Typography variant="h5">Error: {error}</Typography>;
  }

  if (!rows) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <div className='pageContainer'>
    {/* <div className='mainDiv'> */}

      <Grid container spacing={105} >
      <Grid item xs={3}>
      <Card sx={{ 
  width: 800, 
  border: 16, 
  borderStyle: 'groove', 
  borderColor: 'coral', 
  marginTop: 5, 
  height: 500, 
  paddingLeft: 3, 
  paddingTop: 2, 
  paddingRight: 5 
}}>
  <CardContent className='cardCont' sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Typography gutterBottom variant="h5" component="div">
      <b>Name :</b> {book.title}
    </Typography>
    <Typography variant="h6" component="div">
      <b>Author :</b> {book.author}
    </Typography>
    <Typography variant="h6" component="div">
      <b>Year :</b> {book.year}
    </Typography>
    <Typography variant="h6" component="div">
      <b>Genre :</b> {book.genre}
    </Typography>
    <Typography variant="h6" component="div" align="justify">
      <b>Description :</b> <i>{book.Description}</i>
    </Typography>
    <Typography variant="h6" component="div">
      <b>ISBN Number :</b> {book.ISBN}
    </Typography>
  </CardContent>
</Card>


        </Grid>

    <Grid item xs={2}>
      <Card className='imgCard' sx={{ width: 440,height:582,border:16,borderStyle:'groove',borderColor:'coral' }}>
            <CardMedia
              sx={{ height: 550, objectFit: 'contain', alignContent:'center' }}
              image={book.img}
              title={book.title}
            /></Card>
            </Grid>
    </Grid>
    

    {/* </div> */}
    </div>
  );
};

export default BookDetail;
