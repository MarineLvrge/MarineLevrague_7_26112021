import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import feed from './pages/feed';
import connect from './pages/connect';
import profile from './pages/profile';
import Navbar from './components/Navbar';


const App = () => {

  return (
      <BrowserRouter>
        <Router>
          <Navbar />
            <Switch>
              <Route path='/' exact component={feed} />
              <Route path='/connect' exact component={connect} />
              <Route path='/profile' exact component={profile} />
              <Redirect to='/connect' />
            </Switch>
        </Router>
      </BrowserRouter>
  );
};

export default App;
