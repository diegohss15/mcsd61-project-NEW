import React, { useState, useEffect } from 'react';
import { Table, Tabs, Tab, Button, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const CardCreate = () => {
  const [tasks, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const tasksPerPage = 10;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tickets'));
        const taskData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(taskData);
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };

    fetchTasks();
  }, []);

  const pagesVisited = pageNumber * tasksPerPage;
  const displayedTasks = tasks.slice(pagesVisited, pagesVisited + tasksPerPage);
  const pageCount = Math.ceil(tasks.length / tasksPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleTakeover = async (taskId) => {
    try {
      const taskRef = doc(db, 'tickets', taskId);
      await updateDoc(taskRef, {
        assignedTo: auth.currentUser ? auth.currentUser.email : '',
      });

      // Fetch tasks again to update the state
      const querySnapshot = await getDocs(collection(db, 'tickets'));
      const updatedTaskData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(updatedTaskData);
    } catch (error) {
      console.error('Error taking over task: ', error);
    }
  };

  const handleViewDetails = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const userAssignedTasks = tasks.filter(task => task.assignedTo === auth.currentUser?.email);
  const newTasks = tasks.filter(task => !task.assignedTo || task.assignedTo === '');

  return (
    <div className="cards" style={{ width: 'auto', margin: 'auto', minHeight: '0vh', display: '', alignItems: 'center', justifyContent: 'center', overflowX: 'auto' }}>
      <h1 align='center'>Support Requests</h1><br />
      <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3" justify>
        <Tab eventKey="home" title="New">
          <Table striped bordered hover size="sm" style={{ width: '90% !important' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Created by:</th>
                <th>Assigned to: </th>
                <th>Status:</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {newTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.category}</td>
                  <td>{task.priority}</td>
                  <td>{task.createdBy}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.status}</td>
                  <td><Button onClick={() => handleTakeover(task.id)}>Takeover</Button></td>
                  <td><Button onClick={() => handleViewDetails(task.id)}>View</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel={<Button variant="outline-secondary" className="btn-pagination">Previous</Button>}
            nextLabel={<Button variant="outline-secondary" className="btn-pagination">Next</Button>}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'pagination justify-content-center'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            disabledClassName={'disabled'}
            activeClassName={'active'}
          />
        </Tab>
        <Tab eventKey="assigned" title="Assigned to me">
          <Table striped bordered hover size="sm" style={{ width: '90% !important' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Created by:</th>
                <th>Assigned to: </th>
                <th>Status:</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userAssignedTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.category}</td>
                  <td>{task.priority}</td>
                  <td>{task.createdBy}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.status}</td>
                  <td><Button onClick={() => handleTakeover(task.id)}>Takeover</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel={<Button variant="outline-secondary" style={{ marginRight: '5px' }} className="btn-pagination">Previous</Button>}
            nextLabel={<Button variant="outline-secondary" style={{ marginLeft: '5px' }} className="btn-pagination">Next</Button>}
            pageCount={Math.ceil(userAssignedTasks.length / tasksPerPage)}
            onPageChange={changePage}
            containerClassName={'pagination'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            disabledClassName={'disabled'}
            activeClassName={'active'}
          />
        </Tab>
        <Tab eventKey="all" title="All tickets">
          <Table striped bordered hover size="sm">
          </Table>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <div>
              <p>Title: {selectedTask.title}</p>
              <p>Category: {selectedTask.category}</p>
              <p>Priority: {selectedTask.priority}</p>
              <p>Created by: {selectedTask.createdBy}</p>
              <p>Description: {selectedTask.description}</p>
              <p>Status: {selectedTask.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardCreate;