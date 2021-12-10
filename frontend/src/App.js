import React from 'react';
import Routes from './components/Routes'
import home from './pages/home';

function App() {
  return (
    <div>
        <Routes exact path='/' component={home} />
    </div>
  );
}

export default App;
