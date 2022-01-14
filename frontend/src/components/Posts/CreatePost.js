import axios from 'axios';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';

/*const CreatePost = () => {

    let session = false;

    if(!sessionStorage.storageToken){
    window.location = '/connect';
    } else session = true;

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);


    const [data, setData] = useState([]);
    const [title, setTitle] = useState(null);
    const [textContent, setTextContent] = useState(null);
    const [attachment, setAttachment] = useState(null);
    const alert = useAlert();

    function getData() {
        const config = {
            headers: {
                'Authorization' : `Bearer ${token}`,
            },
        };
        axios.get(`${process.env.REACT_APP_URL}api/posts`, data, config)
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        
        const createPost = (e) => {
        e.preventDefault();
        if(textContent === null || textContent === "" || title === null || title === '' || attachment === null) {
            alert.show('Vous ne pouvez pas poster une publication vide')
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
            setTitle("");
            setTextContent("");
            setAttachment(null);
        })
        .catch((error) => console.log(error));
        }
    
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [`${token}`]);
    
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

export default CreatePost; */

/*const PostContainer = () => {

    let session = false;

    if(!sessionStorage.storageToken){
    window.location = '/connect';
    } else session = true;

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    const alert = useAlert();

    const [title, setTitle] = useState(null);
    const [textContent, setTextContent] = useState(null);
    const [file, setFile] = useState(null);

    const formData = new FormData();
    formData.append

    const createPost = (e) => {
        e.preventDefault();

        if(title === null || textContent === null || file === null) {
            alert.show('Impossible de publier une publication vide!');
        } else {
            console.log('OK');

        const config = {
            headers: {
                'Content-type':'multipart/form-data',
                'Authorization' : `Bearer ${token}`,
            },
        };

        const data = new FormData();
        data.append('title', title);
        data.append('textContent', textContent);
        data.append('file', file);

        axios.post(`${process.env.REACT_APP_URL}api/posts`, {
            headers: {'Content-type':'multipart/form-data', 'Authorization' : `Bearer ${token}`
        },
    })
        .then(() => {
            getData();
            setTitle("");
            setTextContent("");
            setFile(null);
        })
        .catch((error) => console.log(error));
        }
    };

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
                       setFile(e.target.files[0])
                    }}/>
                    <br />

                    <button type='submit'>Publier</button>
            </form>
        </main>
    );
};

export default PostContainer;*/

const CreatePost = () => {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [attachment, setAttachment] = useState(null);

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    const alert = useAlert();

    function handleChange(e) {
        setTitle(e.target.value);
        setContent(e.target.value);
        setAttachment(e.target.value);
    }
 
    function handleSubmit() {

        const data = new FormData();
        data.append('title', title);
        data.append('content', content);
        data.append('attachment', attachment);
        data.append('id_user', userId);

        axios.post(`${process.env.REACT_APP_URL}api/posts`, data , {
            Headers: { 
            'Content-Type': 'application/json', 
            'Authorization' : `Bearer ${token}`}
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => console.log(error));
    }

    return (
        <main>
            <form className='formPost' onSubmit={(e) => {
                e.preventDefault();
                if(title === '' || title === null || content === '' || content === null || attachment === null) {
                    alert.show('Vous devez remplir chaque champ avant de poster votre publication!')
                }
            }} method='post'>
                <h1 className='createPost'>Créer une publication</h1>
                    <label htmlFor='formTitle'>Titre</label>
                    <br />
                    <input type='text' name='formTitle' id='formTitle' placeholder='Titre de la publication' /*value={setTitle}*/ onChange={handleChange} />
                    <br />

                    <label htmlFor='formContent'>Texte</label>
                    <br />
                    <input type='text' name='formContent' id='formContent' placeholder='Quoi de neuf ?' /*value={setTextContent}*/ onChange={handleChange} />
                    <br />
            
                    <label htmlFor='attachment' className='formAttachment'>Image</label>
                    <br />
                    <input type='file' name='formAttachment' accept='image/png, image/jpeg, image/jpg, image/gif, image/webp' className='formAttachment' /*value={setAttachment}*/ onChange={handleChange} />
                    <br />

                    <button type='submit' onClick={() => {handleSubmit()}}>Publier</button>
            </form>
        </main>
    );
};

export default CreatePost;