//import React from "react";
import axios from "axios";




const FeedPosts = () => {
    let session = false;

    if(!sessionStorage.storageToken){
        window.location = '/feed';
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

    if(session) {
        return(
            <div>
                Bonjour
            </div>
        );
    };

};
export default FeedPosts;