import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';

const EditProfile = () => {

    const alert = useAlert();

    const userId = JSON.parse (sessionStorage.storageToken).userId;
    const token = JSON.parse (sessionStorage.storageToken).token;
    console.log(userId);
    console.log(token);

    const [editfirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editBio, setEditBio] = useState("");
    const [editImgProfile, setEditImgProfile] = useState(null);

    // Fonction pour récupérer un utilisateur
    function getOneProfile() {
        const id_user = userId;
        axios.get(`${process.env.REACT_APP_URL}api/auth/accounts/${id_user}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            setEditFirstName(res.data.firstName);
            setEditLastName(res.data.lastName);
            setEditBio(res.data.bio);
            setEditImgProfile(res.data.profilPicture);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getOneProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
 

    // Fonction qui modifie le profil utilisateur
    function sendUpdateProfile() {

        let data = new FormData();
        data.append('firstName', editfirstName);
        data.append('lastName', editLastName);
        data.append('bio', editBio);
        data.append('image', editImgProfile);

        const id_user = userId;

        axios.put(`${process.env.REACT_APP_URL}api/auth/accounts/${id_user}`, data, {
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'multipart/form-data',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            alert.show('Votre profil a bien été modifié');
            window.location = '/profile';
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return (
        <div className='editProfileContainer'>
            <form className='editFormProfile' onSubmit={(e) => {
                e.preventDefault();
                sendUpdateProfile();
            }}>
                <h1 className='editProfile'>Modifier mon profil</h1>
                <br />

                    <label htmlFor='editProfileName'>Prénom</label>
                    <input type='text' name='formTitle' id='formTitle' placeholder={editfirstName} onChange={(e) => setEditFirstName(e.target.value)} pattern={(/^[a-zA-Z\s'\-àáâãäæçèéêëìíîïñòóôõöùúûüýÿœÀÁÂÃÄÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÜŒ]+$/g)} required />
                    <br />

                    <label htmlFor='editProfileName'>Nom</label>
                    <input type='text' name='formContent' id='formContent' placeholder={editLastName} onChange={(e) => setEditLastName(e.target.value)} pattern={(/^[a-zA-Z\s'\-àáâãäæçèéêëìíîïñòóôõöùúûüýÿœÀÁÂÃÄÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÜŒ]+$/g)} required />
                    <br />
            
                    <label htmlFor='formProfileBio'>Biographie</label>
                    <input type='text' name='formContent' id='editBio' placeholder={editBio} onChange={(e) => setEditBio(e.target.value)} required />
                    <br />

                    <label htmlFor='image' className='formProfileImg'>Photo de profil</label>
                    <input type='file' name='image' accept='image/png, image/jpeg, image/jpg, image/gif, image/webp' id='uploadImage' onChange={e => {const file = e.target.files[0]; setEditImgProfile(file)}} />
                    <br />

                    <button type='submit'>Modifier mon profil</button>
            
            </form>
        </div>
    );
};

export default EditProfile;