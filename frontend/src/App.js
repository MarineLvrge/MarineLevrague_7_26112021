import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import feed from './pages/feed';
import connect from './pages/connect';
import profile from './pages/profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const App = () => {

  return (
    <BrowserRouter>
      <Router>
        <header>
          <Navbar />
        </header>
          <Switch>
              <section className='bigSection'>
                <Route path='/' exact component={feed} />
                <Route path='/connect' exact component={connect} />
                <Route path='/profile' exact component={profile} />
                <Redirect to='/connect' />
              </section>
          </Switch>
            <br/>
          <footer>
            <Footer />
          </footer>
      </Router>
    </BrowserRouter>
  );
};

export default App;
