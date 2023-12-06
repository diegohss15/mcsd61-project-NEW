import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import AppNavbar from '../Navbar';

import { Button } from 'react-bootstrap';

const TicketAssess = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      if (!authUser) {
        navigate('/signup');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const docRef = doc(db, 'tickets', ticketId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTicket(docSnap.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <AppNavbar />
        <Container className="mt-4 d-flex justify-content-center">
          <div className="cards">
            {!loading && !ticket && (
              <>
                <Card className="custom-card" style={{ width: '42rem' }}>
                  <Card.Body>
                    <Card.Text>No tickets to show yet.</Card.Text>
                  </Card.Body>
                </Card>
                <br/>
                <Card className="custom-card" style={{ width: '42rem' }}>
                  <Card.Body>
                    <Card.Text>Example of ticket description / Comments</Card.Text>
                  </Card.Body>
                </Card>
                <br/>
                <form>
                    <textarea>

                    </textarea>
                    <br/>
                <Button variant="primary">Edit Tcket</Button>{' '}
                <Button variant="success">Close Ticket</Button>{' '}
                </form>

              </>
            )}
      
            {ticket && (
              <Card className="custom-card" style={{ width: '42rem' }}>
                <Card.Header>
                  <Card.Title>Ticket Details</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Title:</strong> {ticket.title}
                    <br />
                    <strong>Category:</strong> {ticket.category}
                    <br />
                    <strong>Priority:</strong> {ticket.priority}
                    <br />
                    <strong>Description:</strong> {ticket.description}
                    <br />
                    <strong>Assigned To:</strong> {ticket.assignTo}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </div>
        </Container>
      </div>
      
    );
};

export default TicketAssess;
