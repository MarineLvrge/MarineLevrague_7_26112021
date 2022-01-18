import React from 'react';
import Profile from '../components/Profile/Profile';

const profil = () => {

    let session = false;

    if(!sessionStorage.storageToken){
    window.location = '/connect';
    } else session = true;

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

        if(!session) {
            <div>Vous n'êtes pas autorisé à voir ce contenu</div>
        } else {
        return (
            <section className='bigSection'> 
                <Profile />
            </section>
        );
    };
}
export default profil;