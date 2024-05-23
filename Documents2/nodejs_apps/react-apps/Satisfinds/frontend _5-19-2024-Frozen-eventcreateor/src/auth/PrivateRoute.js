import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import Login from './Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
