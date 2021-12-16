import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';

const Home = () => {
    const uid = useContext(UidContext);

    return (
        <div className="home-page">
            {uid ? (
                <h1>UPDATE PAGE</h1>
            ) : (
                <div className="log-container">
                <Log signIn={false} signUp={true} />
            </div>
            )}   
        </div>
    );
};

export default Home;