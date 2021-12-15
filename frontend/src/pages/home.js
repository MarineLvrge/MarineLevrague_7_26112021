import React from 'react';
import Log from '../components/Log';

const home = () => {
    return (
        <div className="profile-page">
            <div className="log-container">
                <Log signIn={false} signUp={true} />
            </div>
        </div>
    );
};

export default home;