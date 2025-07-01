import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Box
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://mylibrary-iabe.onrender.com/book/${id}`)
      .then((res) => {
        setBook(res.data); // res.data should be a single book object
      })
      .catch((err) => {
        console.error('Error fetching book data:', err);
        setError('Error fetching book data');
      });
  }, [id]);

  if (error) {
    return <Typography variant="h5" sx={{ m: 4 }}>Error: {error}</Typography>;
  }

  if (!book) {
    return <Typography variant="h5" sx={{ m: 4 }}>Loading book details...</Typography>;
  }

  return (
    <Box className="pageContainer" sx={{ p: 4 }}>
      <Grid container spacing={10}>
        {/* Book Details Card */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              width: '100%',
              border: 16,
              borderStyle: 'groove',
              borderColor: 'coral',
              mt: 5,
              height: 'auto',
              px: 3,
              pt: 2,
              pb: 3
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography gutterBottom variant="h5"><b>Name:</b> {book.title}</Typography>
              <Typography variant="h6"><b>Author:</b> {book.author}</Typography>
              <Typography variant="h6"><b>Year:</b> {book.year}</Typography>
              <Typography variant="h6"><b>Genre:</b> {book.genre}</Typography>
              <Typography variant="h6" align="justify"><b>Description:</b> <i>{book.Description}</i></Typography>
              <Typography variant="h6"><b>ISBN Number:</b> {book.ISBN}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Image Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              width: '100%',
              height: '100%',
              border: 16,
              borderStyle: 'groove',
              borderColor: 'coral'
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: 550, objectFit: 'contain', p: 2 }}
              image={book.img}
              title={book.title}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookDetail;
