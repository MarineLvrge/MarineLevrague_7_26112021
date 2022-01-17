import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LikePost = ({id_post}) => {

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;

    const [likes, setLikes] = useState({});
    const [addLike, setAddLike] = useState(null);

    console.log(id_post);

    // Fonction qui récupère les likes
    useEffect(() => {
    const fetchLikes = () => {
        axios.get(`${process.env.REACT_APP_URL}api/like/count/${id_post}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            setLikes(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

        fetchLikes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Fonction qui poste un like
    const postLike = () => {
        axios.post(`${process.env.REACT_APP_URL}api/like/${id_post}`, userId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            //setAddLike(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <section className='likesContainer'>
            <button onClick={postLike()}></button>
            
        </section>
    );
};

export default LikePost;