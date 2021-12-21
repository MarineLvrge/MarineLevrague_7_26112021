import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        //const emailError = document.querySelector('.email_error');
        //const passwordError = document.querySelector('.password_error');
        const emailOrPasswordError = document.querySelector('.error');
        
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_URL}api/auth/login`,
            withCredentials: true,
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                email,
                password
            }),
        })
        .then((res) => {
            console.log(res.data);
            sessionStorage.setItem('userAuth', JSON.stringify(res.data));
            window.location = '/feed';
        })
        .catch((err) => {
            emailOrPasswordError.innerHTML = 'Adresse mail ou mot de passe invalide';
        });
    };

    return (
        <form action='' onSubmit={handleLogin} id='sign-up-form'>
            <label htmlFor='email'>Email</label>
            <br />
            <input type='text' name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
            <div className='email_error'></div>
            <br />

            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
            <div className='password_error'></div>
            <br />

            <div className='error'></div>
            <input type='submit' value='Se connecter' />
        </form>
    );
};

export default SignInForm;