import React from 'react';

const CreatePost = () => {

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    return (
        <main>
        <form className='formPost'>
            <h1 className='createPost'>Créer une publication</h1>
                <label htmlFor='formTitle'>Titre</label>
                <br />
                <input type='text' name='formTitle' id='formTitle' placeholder='Titre de la publication' />
                <br />

                 <label htmlFor='formContent'></label>
                <br />
                <input type='text' name='formContent' id='formContent' placeholder='Quoi de neuf ?' />
                <br />
            
        </form>
        </main>
    );
};

export default CreatePost;