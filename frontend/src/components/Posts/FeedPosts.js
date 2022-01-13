import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";
import dateFormat from 'dateformat';

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

    const now = new Date();
    dateFormat(now)

    if(!session){
        <div>Vous n'êtes pas connecté</div>
    } else {
        return(
            <main>
                <CreatePost />
                <section className="blocPost">
                    {posts.map((item) => (
                        <div className="postContainer" key={item.id_post}>
                            <div className="postAuthor">
                                <img className="imgProfil" src={item.User.profilPicture} alt="Illustration de profil"/>
                                <p className="postUserName">{item.User.firstName} {item.User.lastName}</p>
                                <span className="datePost">{dateFormat(item.createdAt)}</span>
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
                </section>
            </main> 
        )
    }
};

export default FeedPosts;