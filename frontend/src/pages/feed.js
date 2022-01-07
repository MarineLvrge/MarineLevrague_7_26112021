import React from 'react';
import FeedPosts from '../components/Posts/FeedPosts';

const feed = () => {
    return (
        <div className='feed'>
            <FeedPosts />
            Hello depuis feed
        </div>
    );
};

export default feed;