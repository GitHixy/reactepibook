import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../Card/BookCard';
import { Alert, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FormTextExample from '../TextField/TextField';


const Main = () => {
    const url = 'https://striveschool-api.herokuapp.com/books'
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNmNjA2NzA0NTcyZjAwMTk0OTM5NDIiLCJpYXQiOjE3MDgwODk0NDcsImV4cCI6MTcwOTI5OTA0N30.4kLfeBI7P4IfRFuz6GSWjcR0NNWLy3Z83VDASt-3j1k'
    const [data, setData] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [error, setError] = useState('');
    
    
    useEffect(() => {
        
         const fetchBooks = async () => {
          try {
            const res = await axios.get(url, {
              headers: {'Authorization': `Bearer ${token}`}
            });
            const first20Books = res.data.slice(0, 20);
            console.log(first20Books)
            setData(first20Books);
            setFilteredBooks(first20Books);
          } catch (e) {
            setError('Error fetching books. Please try again later.')
            console.error('Error fetching: ', e);
          }
        };
        fetchBooks();
      }, []);
      

      const handleSearch = (value) => { 
        let result;
        if (isSearchQueryEmpty(value)) {
          setFilteredBooks(data);
        }else {
        result = data.filter(book =>
            book.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBooks(result);
      }
    };

const isSearchQueryEmpty = (string) =>  string === '';

const displayFilteredBookCard = (bookCards) => (
  bookCards.map(book => (
    <BookCard
        key={book.asin}
        title={book.title}
        price={book.price}
        imgSrc={book.img}
        category={book.category}
        asin={book.asin}
    />
))
)
const displayCol = () => (
    <Col>
        <Alert variant="info" className='mt-4'>No books found.</Alert>
    </Col>
)
    return(
        <>
        <Container>
          {error && 
          <Alert variant="danger" className='mt-4'>{error}</Alert>}
          
            <FormTextExample
            onChange = {handleSearch}
            />
            
          
        <Row>
        {filteredBooks.length > 0 ? displayFilteredBookCard(filteredBooks) : displayCol() }
          </Row>
          </Container>
        </>
    )
}

export default Main;