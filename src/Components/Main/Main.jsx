import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../Card/BookCard';
import { Alert, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FormTextExample from '../TextField/TextField';


const Main = () => {
    const url = 'https://epibooks.onrender.com/'
    const [data, setData] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedAsin, setSelectedAsin] = useState(false);
    
    useEffect(() => {
        
        const fetchBooks = async () => {
          try {
            const res = await axios.get(url);
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

      const handleSelect = (asin) => {
        setSelectedAsin((prevSelectedAsin) => prevSelectedAsin === asin ? false : asin);
      };

      const handleSearch = (value) => { 
        setSearchQuery(value)
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
        onClick={() => handleSelect(book.asin)}
        isSelected={book.asin === selectedAsin}
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