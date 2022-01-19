import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreatePost from "./CreatePost";
import Comments from "./Comments";
import { useAlert } from 'react-alert';
import LikePost from "./LikePost";

    const FeedPosts = () => {

        const alert = useAlert();

        let session = false;

        if(!sessionStorage.storageToken){
        window.location = '/connect';
        } else session = true;

        useEffect(() => {
            if(!session) {
                window.location ='/connect' 
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    
        const userId = JSON.parse (sessionStorage.storageToken).userId;
        const token = JSON.parse (sessionStorage.storageToken).token;
        const isAdmin = JSON.parse(sessionStorage.storageToken).isAdmin;
        console.log(userId);
        console.log(token);

        const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            let res;
            try {
                res = await axios.get(`${process.env.REACT_APP_URL}api/posts`, {
                    headers: { 'Authorization' : `Bearer ${token}`,
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

    // Fonction pour supprimer un post
    function deletePost(id_post) {

            axios.delete(`${process.env.REACT_APP_URL}api/posts/${id_post}`,
                {
                    headers: { 'Authorization' : `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    alert.show('Votre publication a bien été supprimée!');
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error)
                })
    }

    // Fonction qui formate la date et l'heure
    function formatedDate(createdAt, updatedAt) {
        const dateISO = new Date(updatedAt);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'numeric', second:'numeric' };
        let date = dateISO.toLocaleDateString('fr-FR', options);
    
        if(createdAt === updatedAt){
            return `Publié le ${date}`;
        }else return `Modifié le ${date}`;
    }

        return(
            <main>
               <button className="goProfile"><Link to={{pathname:'/profile'}}>Voir mon profil <i className="fas fa-arrow-right"></i></Link></button>
                    <CreatePost />
                        <section className="blocPost">
                            {posts.map((item) => (
                                <div className="postContainer" key={item.id_post}>
                                    <div className="postAuthor">
                                    <img className="imgProfil" src={item.User.profilPicture} alt="Illustration de profil"/>
                                    <p className="postUserName">{item.User.firstName} {item.User.lastName}</p>
                                    <p className="datePost">{formatedDate(item.createdAt, item.updatedAt)}</p>
                                </div>

                            {item.User.id_user === userId  || isAdmin ? (
                                <div className="editPost">
                                {item.User.id_user === userId  ? (
                                    <Link to={{pathname:'/updatePost', data: {id_post : item.id_post}}}><button className="editBtn"><i className="fas fa-edit"></i></button></Link>
                                ) : null}
                                <button onClick={() => {deletePost(item.id_post)}} className="deleteBtn"><i className="fas fa-trash-alt"></i></button>
                                </div>
                            ) : null}
                            
                                <div className="postText">
                                    <h2 className="postTitle">{item.title}</h2>
                                    <p className="postContent">{item.content}</p>
                                    <img className="imgPost" src={item.attachment} alt="Illustration"/>
                                </div>
                                <LikePost id_post={item.id_post} />
                                <Comments id_post={item.id_post} />
                            </div>
                        ))}
                    </section>
                </main> 
            )
        };


export default FeedPosts;