import axios from 'axios';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';

const CreatePost = () => {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [image, setImage] = useState(null);

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    const alert = useAlert();
 
    function handleSubmit() {

        let data = new FormData();
        data.append('title', title);
        data.append('content', content);
        data.append('image', image);
        data.append('id_user', userId);

        console.log(title);
        console.log(content);
        console.log(image);
        console.log(userId);

        axios.post(`${process.env.REACT_APP_URL}api/posts`, data , {
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Bearer ${token}`}
            })
        .then((res) => {
            console.log(res.data);
            alert.show('Votre publication a bien été créée!');
            window.location.reload();
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className='formPostContainer'>
            <form className='formPost' onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                if(title === '' || title === null || content === '' || content === null || image === null) {
                    alert.show('Vous devez remplir chaque champ avant de poster votre publication!')
                }
            }} method='post'>
                <h1 className='createPost'>Créer une publication</h1>
                <br />
                    <label htmlFor='formTitle'>Titre</label>
                    <input type='text' name='formTitle' id='formTitle' placeholder='Titre de la publication' onChange={(e) => setTitle(e.target.value)} required />
                    <br />

                    <label htmlFor='formContent'>Texte</label>
                    <textarea type='text' name='formContent' id='formContent' placeholder='Quoi de neuf ?' onChange={(e) => setContent(e.target.value)} required></textarea>
                    <br />
            
                    <label htmlFor='image' className='formImage'>Image</label>
                    <input type='file' name='image' accept='image/png, image/jpeg, image/jpg, image/gif, image/webp' id='uploadImage' onChange={e => {const file = e.target.files[0]; setImage(file)}} required />
                    <br />

                    <button type='submit'>Publier</button>
            </form>
        </div>
    );
};

export default CreatePost;