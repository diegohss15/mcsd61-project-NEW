import React from 'react';
import Dashboard from './Components/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './Components/Pages/Profile';
import NewTicket from './Components/Pages/NewTicket';
import Footer from './Components/Footer';
import TicketAssess from './Components/Pages/TicketAssess';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/NewTicket" component={NewTicket} />
          <Route path="/TicketAssess" component={TicketAssess} />
          {/* Add more routes as needed */}
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
