import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

const AppNavbar = ({ userName }) => {
    return (
        <div class="container.lx" >
            <Navbar bg="dark" variant="dark" expand="lg">
            <Nav.Link href="/"><Navbar.Brand>Support Request</Navbar.Brand></Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link to="/" href="/"><Button variant="outline-light">Home</Button></Nav.Link>
                        
                        <Link to="/TicketAssess" className="nav-link"> <Button variant="outline-light">Ticket Assessments</Button></Link>                        
                        <Link to="/NewTicket" className="nav-link"> <Button variant="success">+ New Ticket </Button></Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="justify-content-end">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Variable for name of the user
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                               <Link to="/profile"> <Dropdown.Item href="/Components/Pages/Profile">Profile</Dropdown.Item></Link>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default AppNavbar;
