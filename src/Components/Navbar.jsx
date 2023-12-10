import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const AppNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className="container.lx">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Nav.Link href="/Dashboard">
          <Navbar.Brand>Support Request</Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/Dashboard" className="nav-link">
              <Button variant="outline-light">Dashboard</Button>
            </Link>
            <Link to="/TicketAssess" className="nav-link">
              <Button variant="outline-light">Ticket Assessments</Button>
            </Link>
            <Link to="/NewTicket" className="nav-link">
              <Button variant="success">+ New Ticket</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {user ? user.email : 'User Email'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link to="/Profile">
                  <Dropdown.Item href="/Components/Pages/Profile">Profile</Dropdown.Item>
                </Link>
                <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
