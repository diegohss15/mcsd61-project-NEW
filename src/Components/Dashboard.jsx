// Dashboard.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AppNavbar from './Navbar';
import CardCreate from './Pages/CardCreate';
import { db } from '../firebase';
import Footer from './Footer';

const Dashboard = () => {
  const userName = "John Doe";

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
          <Col md={5}>
            <Card>
              <Card.Body>
                <Card.Title>Card 2</Card.Title>
                <Card.Text>
                  This is some placeholder content for Card 2. Lets put some other content here
                </Card.Text>
              </Card.Body>
            </Card>
            <br/>
            <Card>
              <Card.Body>
                <Card.Title>Some Graphics?</Card.Title>
                <Card.Text>
                  We can try to add some dinamic graphics here. Changing according to the tickets. Something like: numebr of tickets, solved, unsolved and delayed
                  <br/> <br/>It is optional.. only if we have time, if not.. keep only the tickets card
                </Card.Text>
                <Card.Img src="https://www.thebritishacademy.ac.uk/media/images/Infographics_Update_.width-1000.jpg" alt="Graphic Image" />
              </Card.Body>
            </Card>
            <br/>
            <Card>
              <Card.Body>
                <Card.Title>How about live chat?</Card.Title>
                <Card.Text>
                  I found one API to create kind of live chat.
                  <br/> <br/>It is optional.. only if we have time, if not.. keep only the tickets card
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>
      <Footer/>
    </div>
  );
};

export default Dashboard;
