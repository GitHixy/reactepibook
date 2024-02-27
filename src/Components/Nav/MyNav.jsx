import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Logo/Logo';
import FormTextExample from '../TextField/TextField';
import { useDispatch } from 'react-redux';
import { filterBooks } from '../../reducers/books/booksSlice';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import SwitchExample from '../SwitchBtn/SwitchBtn';

function MyNav({isSearchActive}) {
  const [query, setQuery] = useState('')

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleFilter = (e) => {
  e.preventDefault();
  dispatch(filterBooks(query));
}

  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Logo src = 'https://picsum.photos/80/80' className= 'm-1 rounded-circle'  />
        <Navbar.Brand href="/reactepibook" className='text-white'>EpiBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isSearchActive && (<Nav className="mx-auto">            
            <FormTextExample onChange={handleChange}/>
            <Button type='submit' 
                    variant="secondary" 
                    className='mx-2'
                    size='sm'
                    onClick={handleFilter}>Search</Button>                    
          </Nav>)}
        </Navbar.Collapse>
        <SwitchExample/>
      </Container>
    </Navbar>
  );
}

export default MyNav;