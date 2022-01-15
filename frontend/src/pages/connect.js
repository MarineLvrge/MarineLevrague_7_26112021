import React from 'react';
import Log from '../components/Log';


const Connect = () => {

    return (
        <section className='bigSection'>
            <div className="home-page">
                <div className="log-container">
                    <Log signIn={false} signUp={true} />
                </div> 
            </div>
        </section>
    );
};

export default Connect;