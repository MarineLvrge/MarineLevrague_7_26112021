import React from 'react';
import Log from '../components/Log';


const Home = () => {

    return (
        <div className="home-page">
                <div className="log-container">
                    <Log signIn={false} signUp={true} />
                </div> 
        </div>
    );
};

export default Home;