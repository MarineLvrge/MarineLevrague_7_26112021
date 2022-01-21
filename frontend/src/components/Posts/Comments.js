import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';

const GetComments = ({id_post}) => {

    const alert = useAlert();

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    const isAdmin = JSON.parse (sessionStorage.storageToken).isAdmin;
    //console.log(userId);
    //console.log(token);

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

    
    // Fonction qui récupère les commentaires
    const fetchComments = () => {
        axios.get(`${process.env.REACT_APP_URL}api/comments/post/${id_post}`, {
            headers: {
                'Authorization' : `Bearer ${token}`,
            },
        })
        .then((res) => {
            setComments(res.data);
            //console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
    
    useEffect(() => {
        fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    // Fonction pour ajouter un commentaire
    function postComment(id_post) {
        if(comment === "") {
            alert.show('Vous ne pouvez pas poster un commentaire vide')
        } else {
        axios.post(`${process.env.REACT_APP_URL}api/comments/${id_post}`, 
        JSON.stringify({comment : comment, id_user: userId}), {
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`}
        })
        .then((res) => {
            setComment(res.data);
            alert.show('Votre commentaire a bien été publié!')
            fetchComments();
            setComment('');
        })
        .catch((error) => console.log(error));
    }
    }
    // Fonction pour supprimer un commentaire
    function deleteComment(id_comment) {

        axios.delete(`${process.env.REACT_APP_URL}api/comments/${id_comment}`, {
            headers: { 'Authorization' : `Bearer ${token}`,
        },
        })
        .then((res) => {
            console.log(res.data);
            alert.show('Votre commentaire a bien été supprimé!')
            fetchComments();       
        })
        .catch((error) => console.log(error));
    }


    return (
        <div>
            <section className='commentsList'>
            <div className='createComment'>
                    <input placeholder='Rédiger un commentaire' className='commentContent' value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button onClick={() => {
                        postComment(id_post)}} className='commentBtn'>Publier</button>
                </div>
            {comments.map((item) => (
                <div className='commentsContainer' key={item.id_comment}>

                <div className='infoUser'>
                    <img className="imgProfil" src={item.User.profilPicture} alt="Illustration de profil"/>
                    <p className="commentUserName">{item.User.firstName} {item.User.lastName}</p>
                    <p className="commentDate">{formatedDate(item.createdAt, item.updatedAt)}</p>
                   
                    {item.id_user === userId || isAdmin ? (
                    <div className='editComment'>
                        <button onClick={() => {deleteComment(item.id_comment)}} className="deleteBtn"><i className="fas fa-trash-alt"></i></button>   
                    </div>
                    ) : null}

                </div>
                <p className='commentText'>"{item.comment}"</p>
                </div>
                
            ))}

            </section>
            
        </div>
    );
};

export default GetComments;