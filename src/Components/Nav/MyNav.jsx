import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from '../Link/Link';
import Logo from '../Logo/Logo';
import FormTextExample from '../TextField/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { allBooks, filterBooks } from '../../reducers/books/booksSlice';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function MyNav() {
  const [query, setQuery] = useState('')
  const books = useSelector(allBooks)

  const dispatch = useDispatch()
  const handleFilter = (e) => {
  e.preventDefault();
  dispatch(filterBooks(query))
}

  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Logo src = 'https://picsum.photos/80/80' className= 'm-1 rounded-circle'  />
        <Navbar.Brand href="#home" className='text-white'>EpiBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <FormTextExample onChange={(e)=> setQuery(e.target.value)}/>
            <Button type='submit' 
                    variant="secondary" 
                    className='mx-2'
                    size='sm'
                    onClick={handleFilter}>Search</Button>
            <Link href='#' text='Home' className='text-white m-2'/>
            <Link href='#' text='About' className='text-white m-2'/>
            <Link href='#' text='Browse' className='text-white m-2'/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;