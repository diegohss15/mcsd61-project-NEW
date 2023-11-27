import React, { useState, useEffect } from 'react';
import { Table, Tabs, Tab, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const CardCreate = () => {
  const [tasks, setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
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

  return (
<div className="cards" style={{ width: 'auto', margin: 'auto', minHeight: '0vh', display: '', alignItems: 'center', justifyContent: 'center', overflowX: 'auto' }}>
      <h1 align='center'>Support Requests</h1><br/>
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
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.category}</td>
                  <td>{task.priority}</td>
                  <td>{task.createdBy}</td>
                  <td><Button>Takeover</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel={<Button variant="outline-secondary" style={{ marginRight: '5px' }} className="btn-pagination">Previous</Button>}
            nextLabel={<Button variant="outline-secondary" style={{ marginLeft: '5px' }} className="btn-pagination">Next</Button>}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'pagination'}
            previousLinkClassName={'previous'}
            nextLinkClassName={'next'}
            disabledClassName={'disabled'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            subContainerClassName={'pages pagination'}
          />
        </Tab>
        <Tab eventKey="assigned" title="Assigned to me">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Created by:</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Area designed for tasks assigned to the user (Login system must work first) */}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="all" title="All tickets">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Created by:</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Display all available tasks */}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default CardCreate;
