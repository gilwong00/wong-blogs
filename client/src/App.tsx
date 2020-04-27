import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Login, Register } from './Auth';
import { PostList, Post } from './Post';
import { ProtectedRoute } from './ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
				<ProtectedRoute path='/post/:id' component={Post} />
				<ProtectedRoute path='/mypost' component={PostList} />
        <ProtectedRoute exact path='/' component={PostList} />
      </Switch>
    </Router>
  );
}

export default App;
