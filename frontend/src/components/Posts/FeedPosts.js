import React from "react";
import axios from "axios";

const FeedPosts = () => {

    let session = false;

    if(!sessionStorage.storageToken){
        window.location = '/connect';
    } else session = true;

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    axios.get(`${process.env.REACT_APP_URL}api/posts`, {
        headers: {'authorization' : `Bearer ${token}`}
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {'Erreur dans la récupération des posts'});



    if(!session) {
        window.location = '/connect';
    } else {
        return(
            <div className="post-container">
                <h1>Votre fil d'actualité</h1>
            </div>
        )
    }

};

export default FeedPosts;