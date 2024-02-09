import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from '../Link/Link';
import Logo from '../Logo/Logo';


function MyNav() {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Logo src = 'https://picsum.photos/100/100' className= 'm-1 rounded-circle'  />
        <Navbar.Brand href="#home" className='text-white'>EpiBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
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