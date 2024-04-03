import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import {logout} from '../acitons/userActions'
import {useNavigate} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <Navbar expand="lg" className="bg-dark-subtle">
        <Container>
            <Navbar.Brand>Admin Home</Navbar.Brand>
            <Nav className='me-auto'>
                <Nav.Link onClick={()=>navigate('/ad-home')}>Users</Nav.Link>
                <Nav.Link onClick={()=>navigate('/ad-home/posts/')}>Posts</Nav.Link> 
            </Nav>
            <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-end px-5'>
            <Button variant='outline-dark' onClick={handleLogout}>
                Logout
            </Button>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Header;