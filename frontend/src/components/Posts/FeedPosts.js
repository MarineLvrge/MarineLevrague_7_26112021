/*import React, { useEffect, useState } from "react";
import axios from "axios";


    let session = false;

    if(!sessionStorage.storageToken){
        window.location = '/connect';
    } else session = true;

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);


const FeedPosts = () => {
    const [posts, setPosts] = useState([]);


  
    useEffect(() => {
        const fetchPosts = async () => {
            let res;
            try {
                res = await axios.get(`${process.env.REACT_APP_URL}api/posts`, {
                    headers: {'Authorization' : `Bearer ${token}`,
                },
                });
            } catch(error) {
                throw error;
            }
            console.log(res);
            setPosts(res.data);
        }
        
        fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [`${token}`]);

    console.log(posts);


    if(!session){
        <div>Vous n'êtes pas connecté</div>
    } else {
        return(
            <div className="post-container">
                <h1>Votre fil d'actualité</h1>
                {posts.map((item) => (
                    <div className="postContent" key={item.id_user}>
                        <div className="postAuthor">{item.id_user ? item.id_user.firstName : 'deleted user'}
                        </div>
                        <div className="postText">
                            <span>{item.title}</span>
                            <span>{item.content}</span>
                            <span>{item.attachment}</span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}


export default FeedPosts;*/


import React, { useEffect, useState } from "react";
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

        const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            let res;
            try {
                res = await axios.get(`${process.env.REACT_APP_URL}api/posts`, {
                    headers: {'Authorization' : `Bearer ${token}`,
                },
            });
            } catch(error) {
                throw error;
            }
            console.log(res);
            setPosts(res.data);
    }
            
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [`${token}`]);
    
    console.log(posts);

    if(!session){
        <div>Vous n'êtes pas connecté</div>
    } else {
        return(
            <div className="blocPost">
                Inserer le bloc pour poster une publication
                {posts.map((item) => (
                    <div className="postContainer" key={item.id_post}>
                        <div className="postAuthor">
                            <img className="imgProfil" src={item.User.profilPicture} alt="Illustration de profil"/>
                            <p className="postUserName">{item.User.firstName} {item.User.lastName}</p>
                        </div>
                        <div className="postText">
                            <h1 className="postTitle">{item.title}</h1>
                            <p className="postContent">{item.content}</p>
                            <img className="imgPost" src={item.attachment} alt="Illustration"/>
                        </div>
                        Ici les réactions de la publication
                        Et à côté les commentaires
                    </div>
                ))}
            </div>
        )
    }
};

export default FeedPosts;