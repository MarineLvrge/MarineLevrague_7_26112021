import React from 'react';
import EditProfile from '../components/Profile/EditProfile';

const updateProfile = () => {

    let session = false;

    if(!sessionStorage.storageToken){
    window.location = '/connect';
    } else session = true;

    if(!session) {
        <div>Vous n'êtes pas autorisé à voir ce contenu</div>
    } else {
        return (
            <section className='bigSection'>
                <EditProfile />
            </section>
        );
    };
};
export default updateProfile;