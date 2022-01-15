import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetComments = ({id_post}) => {

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    

    

    return (
        <div>
            <button></button>
            
        </div>
    );
};

export default GetComments;