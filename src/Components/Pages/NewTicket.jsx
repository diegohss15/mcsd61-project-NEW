import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from '../Navbar';

const NewTicket = () => {
  const initialFormData = {
    category: '',
    priority: '',
    title: '',
    description: '',
    assignTo: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'tickets'), formData);

      console.log('Document written with ID: ', docRef.id);

      setFormData(initialFormData); // Reset the form data to initial values
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancelClick = () => {
    setFormData(initialFormData); // Reset the form data to initial values
  };

  return (
    <div>
      <AppNavbar />
      <Container className="mt-4 d-flex justify-content-center">
        <div className="cards">
          <Card className="custom-card" style={{ width: '42rem' }}>
            <Card.Header>
              <Nav variant="pills" defaultActiveKey="#first">
                <Nav.Item>
                  <Link to="/" className="nav-link">
                    <Button variant="primary">Go back</Button>
                  </Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Create your task:</Card.Title>
              <Form onSubmit={handleFormSubmit}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    aria-label="Default select example"
                    required
                  >
                    <option value="">Category</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                  </Form.Select>
                  &nbsp;&nbsp;&nbsp;
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    aria-label="Default select example"
                    required
                  >
                    <option value="">Priority</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </Form.Select>
                </div>
                <Card.Text>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter task title"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Describe your issue:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Select
                      name="assignTo"
                      value={formData.assignTo}
                      onChange={handleInputChange}
                      aria-label="Default select example"
                    >
                      <option value="">Assign to:</option>
                      <option value="User 1">User 1</option>
                      <option value="User 2">User 2</option>
                      <option value="User 3">User 3</option>
                    </Form.Select>
                  </div>
                  <>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Label>Attachment</Form.Label>
                      <Form.Control type="file" multiple />
                    </Form.Group>
                  </>
                  <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                      <br />
                      1 - We aim to solve all tickets in 24-hours.<br />
                      2 - Ticket assignment doesn't always speed things up; it can actually slow them down. <br />
                      3 - Critical Priority is limited! If you have no permission, request it from your supervisor.
                    </Form.Text>
                  </Form.Group>
                  <Button type="submit" variant="success">
                    Create Ticket
                  </Button>{' '}
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="outline-danger" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </Card.Text>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default NewTicket;
