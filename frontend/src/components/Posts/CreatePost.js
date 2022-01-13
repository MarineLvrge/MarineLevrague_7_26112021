import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { useAlert } from 'react-alert';

const CreatePost = () => {

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    const [data, setData] = useState([]);
    const [title, setTitle] = useState(null);
    const [textContent, setTextContent] = useState(null);
    const [attachment, setAttachment] = useState(null);
    //const alert = useAlert();
    console.log(title);

    function getData() {
        const config = {
            headers: {
                'Authorization' : `Bearer ${token}`,
            },
        };
        axios.get(`${process.env.REACT_APP_URL}api/posts`, data, config)
        .then((res) => setData(res.data.posts))
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createPost = (e) => {
        e.preventDefault();
        if(attachment === null && textContent === "") {
            alert('Vous ne pouvez pas poster une publication vide')
        } else {
            console.log("OK");

        const config = {
            headers: {
                'Authorization' : `Bearer ${token}`,
            },
        };

        const data = new FormData();
        data.append('title', title);
        data.append('textContent', textContent);
        data.append('attachment', attachment);

        axios.post(`${process.env.REACT_APP_URL}api/posts`, config)
        .then(() => {
            getData();
            setTitle("");
            setTextContent("");
            setAttachment();
        })
        .catch((error) => console.log(error));
        }
    }

    return (
        <main>
            <form className='formPost' onSubmit={createPost} method='post'>
                <h1 className='createPost'>Créer une publication</h1>
                    <label htmlFor='formTitle'>Titre</label>
                    <br />
                    <input type='text' name='formTitle' id='formTitle' placeholder='Titre de la publication' onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                    <br />

                    <label htmlFor='formContent'>Texte</label>
                    <br />
                    <input type='text' name='formContent' id='formContent' placeholder='Quoi de neuf ?' onChange={(e) => {
                        setTextContent(e.target.value)
                    }}/>
                    <br />
            
                    <label htmlFor='attachment' className='formAttachment'>Image</label>
                    <br />
                    <input type='file' name='formAttachment' accept='image/png, image/jpeg, image/jpg, image/gif, image/webp' className='formAttachment' onChange={(e) => {
                       setAttachment(e.target.files[0])
                    }}/>
                    <br />

                    <button type='submit'>Publier</button>
            </form>
        </main>
    );
};

export default CreatePost;