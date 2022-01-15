import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-mui';
import feed from './pages/feed';
import connect from './pages/connect';
import profile from './pages/profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const alertOptions = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const App = () => {

  return (
    <>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <BrowserRouter>
        <Router>
          <Navbar />
              <Switch>
                <Route path='/' exact component={feed} />
                <Route path='/connect' exact component={connect} />
                <Route path='/profile' exact component={profile} />
                <Redirect to='/connect' />
              </Switch>
            <Footer />
        </Router>
      </BrowserRouter>
    </AlertProvider>
    </>
  );
};

export default App;
