import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    // Fonction qui supprime le profil utilisateur de la session en cours
    function deleteProfile() {
        const response = window.confirm('Souhaitez-vous vraiment supprimer votre compte définitivement ?');
        const id_user = userId;
        if(response === true) {
        axios.delete(`${process.env.REACT_APP_URL}api/auth/accounts/${id_user}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            },
        })
        .then((res) => {
            console.log(res.data);
            sessionStorage.clear();
            if(!sessionStorage.storageToken){
                window.location = '/connect';
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    }
    
    return (
        <section className='profileContainer'>
            <h1 className='profilTitle'>Mon profil</h1>
            <div className='editProfile'>
                    <Link to={{pathname:'/updateProfile'}}><button className="editBtn"><i className="fas fa-edit"></i></button></Link>
                    <button onClick={() => {deleteProfile(userId)}} className='deleteBtn'><i className="fas fa-trash-alt"></i></button>
                </div>

                <div className='infoProfile'>
                    <p className='profileName'>{firstName}</p>
                    <p className='profileName'>{lastName}</p>
                    <p className='profileBio'>Biographie: "{bio}"</p>
                    <img className='profileImg' src={profilPicture} alt='Illustration de profil'/>
                </div>
        </section>
    );
};

export default Profile;