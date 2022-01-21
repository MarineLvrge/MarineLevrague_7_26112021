import React from 'react';
import Profile from '../components/Profile/Profile';

const profil = () => {

    let session = false;

    if(!sessionStorage.storageToken){
    window.location = '/connect';
    } else session = true;

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