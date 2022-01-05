import React from 'react';
import Log from '../components/Log';


const Home = () => {

    return (
        <div className="home-page">
            <h1>GROUPOMANIA</h1>
                <div className="log-container">
                    <Log signIn={false} signUp={true} />
                </div> 
        </div>
    );
};

export default Home;