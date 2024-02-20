import React, { useState, useEffect } from 'react';
import BookCard from '../Card/BookCard';
import { Alert, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { allBooks, getBooks, isAllBooksError, isAllBooksLoading } from '../../reducers/books/booksSlice';


const Main = () => {
    const loading = useSelector(isAllBooksLoading)
    const books = useSelector(allBooks)
    const error = useSelector(isAllBooksError)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getBooks())
      }, [dispatch]);
      
const displayBookCards = (books) => (
  books.map(book => (
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
          { error &&
          <Alert variant="danger" className='mt-4'>{error}</Alert>}
          {loading && (
            'Loading..'
          )}
        <Row>
          {!loading && !error && (
        books.length > 0 ? displayBookCards(books) : displayCol() )}
          </Row>
          </Container>
        </>
    )
}

export default Main;