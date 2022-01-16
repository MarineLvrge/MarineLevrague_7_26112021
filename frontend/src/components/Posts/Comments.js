import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetComments = ({id_post}) => {

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    // Fonction qui formate la date
    function formatedDate(createdAt, updatedAt) {
        const dateISO = new Date(updatedAt);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'numeric', second:'numeric' };
        let date = dateISO.toLocaleDateString('fr-FR', options);
        
        if(createdAt === updatedAt){
            return `Publié le ${date}`;
        }else return `Modifié le ${date}`;
    }
    

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    console.log(id_post)
    
    // Fonction qui récupère les commentaires
    const fetchComments = () => {
        axios.get(`${process.env.REACT_APP_URL}api/comments/post/${id_post}`, {
            headers: {
                'Authorization' : `Bearer ${token}`,
            },
        })
        .then((res) => {
            setComments(res.data);
            console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
    
    useEffect(() => {
        fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    // Fonction pour ajouter un commentaire
    function postComment(id_post) {

        console.log(comment);
        console.log(userId);
        console.log(id_post)

        axios.post(`${process.env.REACT_APP_URL}api/comments/${id_post}`, 
        JSON.stringify({comment : comment, id_user: userId}), {
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`}
        })
        .then((res) => {
            console.log(res.data);
            setComment(res.data);
            fetchComments();
            setComment('');
        })
        .catch((error) => console.log(error));
    }

    // Fonction pour supprimer un commentaire
    



    return (
        <div>
            <section className='commentsList'>
            {comments.map((item) => (
                <div className='commentsAuthor' key={item.id_comment}>
                    <img className="imgProfil" src={item.User.profilPicture} alt="Illustration de profil"/>
                    <p className="commentUserName">{item.User.firstName} {item.User.lastName}</p>
                    <p className='commentText'>{item.comment}</p>
                    <p className="commentDate">{formatedDate(item.createdAt, item.updatedAt)}</p>
                </div>

            ))}
                <div className='createComment'>
                    <input placeholder='Rédiger un commentaire' className='commentContent' value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button onClick={() => {
                        postComment(id_post)}} className='commentBtn'>Publier</button>
                </div>
            </section>
            
        </div>
    );
};

export default GetComments;