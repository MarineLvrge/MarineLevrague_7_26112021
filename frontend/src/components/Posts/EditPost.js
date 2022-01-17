import axios from 'axios';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';


const EditPost = ({id_post}) => {

    const getOnePost = () => {
        axios.get(`${process.env.REACT_APP_URL}api/posts/${id_post}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data)
            setEditTitle(res.data);
            setEditContent(res.data);
            setEditImage(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    const [editTitle, setEditTitle] = useState(null);
    const [editContent, setEditContent] = useState(null);
    const [editImage, setEditImage] = useState(null);

    const alert = useAlert();

    function editPost() {
        
        let data = new FormData();
        data.append('title', editTitle);
        data.append('content', editContent);
        data.append('image', editImage);
        data.append('id_user', userId);

        console.log(editTitle);
        console.log(editContent);
        console.log(editImage);
        console.log(userId);


        axios.put(`${process.env.REACT_APP_URL}api/posts/${id_post}`, data, {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className='editPostContainer'>
            <form className='editPost' onSubmit={(e) => {
                e.preventDefault();
                getOnePost();
                editPost();
                if(editTitle === '' || editTitle === null || editContent === '' || editContent === null || editImage === null) {
                alert.show('Vous devez remplir chaque champ avant de poster votre publication!')
                }
            }}>
                <h1 className='createPost'>Modifier une publication</h1>
                <br />

                    <label htmlFor='formTitle'>Titre</label>
                    <input type='text' name='formTitle' id='formTitle' placeholder='Titre de la publication' onChange={(e) => setEditTitle(e.target.value)} required />
                    <br />

                    <label htmlFor='formContent'>Texte</label>
                    <input type='text' name='formContent' id='formContent' placeholder='Quoi de neuf ?' onChange={(e) => setEditContent(e.target.value)} required />
                    <br />
            
                    <label htmlFor='image' className='formImage'>Image</label>
                    <input type='file' name='image' accept='image/png, image/jpeg, image/jpg, image/gif, image/webp' id='uploadImage' onChange={e => {const file = e.target.files[0]; setEditImage(file)}} required />
                    <br />

                    <button type='submit'>Modifier ma publication</button>
            
            </form>
        </div>
    );
};

export default EditPost;