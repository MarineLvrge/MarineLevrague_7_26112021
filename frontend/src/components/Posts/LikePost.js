import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const LikePost = ({id_post}) => {

    let storageToken = sessionStorage.getItem('storageToken');
    let token = JSON.parse(storageToken).token;
    let decodedUser = jwt_decode(token);
    let userId = decodedUser.userId;

    const [readLike, setReadLike] = useState(false);
    const [likes, setLikes] = useState(0);


    // Fonction qui récupère les likes
    const fetchLikes = () => {
        let countLikes = 0;
        axios.get(`${process.env.REACT_APP_URL}api/like/count/${id_post}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            countLikes = res.data.totalLikes;
            setLikes(countLikes);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        fetchLikes();
        isItLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Fonction qui poste un like
    const postLike = () => {
        let countLikes = 0;
        let like = readLike ? 0 : 1;
        const data = {
            id_user : userId,
            like : like,
        };

        axios.post(`${process.env.REACT_APP_URL}api/like/${id_post}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            countLikes = likes;
            res.data.message === 'Like' ? countLikes++ : countLikes--;
            setReadLike(like);
            setLikes(countLikes);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // Fonction qui stocke le statut des likes
    const isItLike = () => {
        const data = {
            id_user : userId
        }
        axios.post(`${process.env.REACT_APP_URL}api/like/read/${id_post}`, data, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.data.like === 1) {
                setReadLike(true);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return (
        <section className='likesContainer'>
            <div className='nbLikes'>{likes}</div>
           
            <button className='btnLike' onClick={(e) => { postLike() }}><i className={`far ${readLike ? 'fa-thumbs-down' :'fa-thumbs-up' }`}></i></button>            
        </section>
    );
};

export default LikePost;