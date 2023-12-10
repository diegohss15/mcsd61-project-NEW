import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AppNavbar from './Navbar';
import CardCreate from './Pages/CardCreate';
import { auth } from '../firebase';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      if (!authUser) {
        // IF no user is logged, redirect to login
        navigate('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  if (!user) {
    // Testblock (Should not come to here)
    return null;
  }

  const userName = user.displayName || 'John Doe';
  const userEmail = user.email || 'john@example.com';

  return (
    <div>
      <AppNavbar userName={userName} />
      <Container className="mt-4">
        <Row>
          <Col md="auto">
            <Card>
              <Card.Body>
                <CardCreate />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Card 2</Card.Title>
                <Card.Text>
                  <p>Hello, {userName}!</p>
                  <p>Your email: {userEmail}</p>
                  <p>Welcome to your dashboard!</p>

                </Card.Text>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <Card.Title>Some Graphics?</Card.Title>
                <Card.Text>
                  We can try to add some dynamic graphics here. Changing according to the tickets. Something like: number of tickets, solved, unsolved, and delayed
                  <br /> <br />It is optional... only if we have time, if not, keep only the tickets card
                </Card.Text>
                <Card.Img src="https://www.thebritishacademy.ac.uk/media/images/Infographics_Update_.width-1000.jpg" alt="Graphic Image" />
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <Card.Title>How about live chat?</Card.Title>
                <Card.Text>
                  I found one API to create a kind of live chat.
                  <br /> <br />It is optional... only if we have time, if not, keep only the tickets card
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Dashboard;
