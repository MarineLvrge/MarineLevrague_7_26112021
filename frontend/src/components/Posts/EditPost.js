import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';


const EditPost = ({id_post}) => {

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    const [editTitle, setEditTitle] = useState(null);
    const [editContent, setEditContent] = useState(null);
    const [editImage, setEditImage] = useState(null);

    const alert = useAlert();


    useEffect(() => {
    function getOnePost() {
        console.log("getonepost s'execute ")
        axios.get(`${process.env.REACT_APP_URL}api/posts/${id_post}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            setEditTitle(res.data.title);
            setEditContent(res.data.content);

        })
        .catch((error) => {
            console.log(error);
        })
    }
        getOnePost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    

    function sendPost() {
        
        let data = new FormData();
        data.append('title', editTitle);
        data.append('content', editContent);
        data.append('image', editImage);
        data.append('id_user', userId);


        axios.put(`${process.env.REACT_APP_URL}api/posts/${id_post}`, data, {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            window.location = '/';
        })
        .catch((error) => console.log(error));
    }

    const handleChangeTitle = (e) => {
        setEditTitle(e.target.value);
    }
    const handleChangeContent = (e) => {
        setEditContent(e.target.value);
    }
        
    return (
        <div className='formPostContainer'>
            <form className='formPost' onSubmit={(e) => {
                e.preventDefault();
                if(editTitle === '' || editTitle === null || editContent === '' || editContent === null ) {
                alert.show('Vous devez remplir chaque champ avant de poster votre publication!')
                }
                sendPost();
            }}>
                <h1 className='createPost'>Modifier une publication</h1>
                <br />

                    <label htmlFor='formTitle'>Titre</label>
                    <input type='text' name='formTitle' id='formTitle' placeholder={editTitle} onChange={handleChangeTitle}  required />
                    <br />

                    <label htmlFor='formContent'>Texte</label>
                    <input type='text' name='formContent' id='formContent' placeholder={editContent} onChange={handleChangeContent}  required />
                    <br />
            
                    <label htmlFor='image' className='formImage'>Image</label>
                    <input type='file' name='image' accept='image/png, image/jpeg, image/jpg, image/gif, image/webp' id='uploadImage' onChange={e => {const file = e.target.files[0]; setEditImage(file)}} />
                    <br />

                    <button type='submit'>Modifier ma publication</button>
            
            </form>
        </div>
        )
};
    
export default EditPost;