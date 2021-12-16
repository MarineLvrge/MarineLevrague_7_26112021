import React, { useState, useEffect } from 'react';
import Routes from './components/Routes'
import home from './pages/home';
import { UidContext } from './components/AppContext';
import axios from 'axios';


const App = () => {

  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_URL}api/auth/`,
        withCredentials: true,
      })
      .then((res) => {
        setUid(res.data);
      })
      .catch((err) => console.log('No token'));
    };
    fetchToken();
  })

  return (
    <UidContext.Provider value={uid}>
      <Routes exact path='/' component={home} />
    </UidContext.Provider>
  );
};

export default App;
