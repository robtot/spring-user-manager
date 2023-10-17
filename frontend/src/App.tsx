import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserList from './components/UserList';
import UserEdit from "./components/UserEdit";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/users' element={<UserList />}/>
            <Route path="/users/:id" element={<UserEdit />}/>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
