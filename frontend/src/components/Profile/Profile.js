import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {

    let session = false;

    if(!sessionStorage.storageToken){
    window.location = '/connect';
    } else session = true;

    useEffect(() => {
        if(!session) {
            window.location ='/connect' 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [profilPicture, setProfilPicture] = useState(null);

    // Fonction qui récupère le profil utilisateur de la session en cours
        const fetchProfile = () => {
            const id_user = userId;
            axios.get(`${process.env.REACT_APP_URL}api/auth/accounts/${id_user}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`},
            })
            .then((res) => {
                console.log(res.data);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setBio(res.data.bio);
                setProfilPicture(res.data.profilPicture);
            })
            .catch((error) => {
                console.log(error);
            })
        }

        useEffect(() => {
            fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (
        <section className='profileContainer'>
            <h1>Votre profil</h1>
                <div className='postAuthor'>
                    <p className='postUserName'>{firstName}</p>
                    <p className='postUserName'>{lastName}</p>
                    <p>Biographie: {bio}</p>
                    <img className='imgProfil' src={profilPicture} alt='Illustration de profil'/>
                </div>
        </section>
    );
};

export default Profile;