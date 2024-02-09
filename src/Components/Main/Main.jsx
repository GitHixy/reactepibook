import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../Card/BookCard';
import { nanoid } from 'nanoid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


const Main = () => {
    const url = 'https://epibooks.onrender.com/'
    const [data, setData] = useState([]);
    
    useEffect(() => {
        
        const fetchBooks = async () => {
          try {
            const res = await axios.get(url);
            const first20Books = res.data.slice(0, 20);
            console.log(first20Books)
            setData(first20Books);
          } catch (e) {
            console.error('Error fetching: ', e);
          }
        };
        fetchBooks();
      }, []);

    return(
        <>
        <Container>
        <Row>
        {data.map(book => (           
            <BookCard 
              key={nanoid()}
              title={book.title}
              price={book.price}
              imgSrc={book.img}
              category={book.category}
              asin={book.asin}
            />
          ))}
          </Row>
          </Container>
        </>
    )
}

export default Main;