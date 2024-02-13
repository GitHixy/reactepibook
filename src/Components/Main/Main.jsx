import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../Card/BookCard';
import { Alert, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


const Main = () => {
    const url = 'https://epibooks.onrender.com/'
    const [data, setData] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('')
    
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

      const handleSearchInput = (e) => {
        setSearchQuery(e.target.value);
      };

      const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      }

      const handleSearch = () => { 
        if (searchQuery === '') {
          setFilteredBooks(data);
        }else {
        const result = data.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(result);
      }
    };

    return(
        <>
        <Container>
          {error && 
          <Alert variant="danger" className='mt-4'>{error}</Alert>}
          <Row>
            <Col>
            <input 
            type = "text" 
            className = 'w-25 mt-4' 
            placeholder = 'Search...'
            value = {searchQuery}
            onChange = {handleSearchInput}
            onKeyDown = {handleEnterSearch}
            />
            <button className='btn btn-primary mx-2' onClick = {handleSearch}>Search</button>
            </Col>
          </Row>
        <Row>
        {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <BookCard
                                key={book.asin}
                                title={book.title}
                                price={book.price}
                                imgSrc={book.img}
                                category={book.category}
                                asin={book.asin}
                            />
                        ))
                    ) : (
                        <Col>
                            <Alert variant="info" className='mt-4'>No books found.</Alert>
                        </Col>
                    )}
          </Row>
          </Container>
        </>
    )
}

export default Main;