import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LikePost = ({id_post}) => {

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;

    
    //const [addLike, setAddLike] = useState(0);

    let countLikes = 0;

    const [likes, setLikes] = useState(0);

    let readLike = false;

    console.log(id_post);

    // Fonction qui récupère les likes
    const fetchLikes = () => {
        axios.get(`${process.env.REACT_APP_URL}api/like/count/${id_post}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            countLikes = res.data.totalLikes;
            setLikes(countLikes) ;
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
        readLike = !readLike;
        let like = 0;
        if(readLike === true) {
            like = 1;
            countLikes++
        } else {
            countLikes--
        }
        const data = {
            id_user : userId,
            like : like,
        };
        console.log(`readlike ${readLike}`);
        console.log(`like ${like}`);
        axios.post(`${process.env.REACT_APP_URL}api/like/${id_post}`, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            //fetchLikes();
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
            console.log(res.data);
            if(res.data.like === 1) {
                readLike = true;
            }
            console.log(`readlike lecture ${readLike}`);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    

    return (
        <section className='likesContainer'>
            <div className='nbLikes'>{likes}</div>
           
            <button className='btnLike' onClick={(e) => {postLike()}}><i className="far fa-thumbs-up"></i></button>
            
        </section>
    );
};

export default LikePost;