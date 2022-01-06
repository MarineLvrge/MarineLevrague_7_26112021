import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import feed from './pages/feed';
import home from './pages/home';
import profile from './pages/profile';
import Navbar from './components/Navbar';


const App = () => {

  return (
    <BrowserRouter>
      <Router>
        <Navbar />
          <Switch>
            <Route path='/' exact component={home} />
            <Route path='/feed' exact component={feed} />
            <Route path='/profile' exact component={profile} />
            <Redirect to='/' />
          </Switch>
      </Router>
    </BrowserRouter>
  );
};

export default App;
