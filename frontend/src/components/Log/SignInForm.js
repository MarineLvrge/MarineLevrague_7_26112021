import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email_error');
        const passwordError = document.querySelector('.password_error');
        
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
            console.log(res);
            if (res.data) {
                emailError.innerHTML = "L'adresse mail est introuvable";
                passwordError.innerHTML = "Le mot de passe est incorrect";
            } else {
                window.location = '/';
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <form action='' onSubmit={handleLogin} id='sign-up-form'>
            <label htmlFor='email'>Email</label>
            <br />
            <input type='text' name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className='email_error'></div>
            <br />

            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className='password_error'></div>
            <br />

            <input type='submit' value='Se connecter' />
        </form>
    );
};

export default SignInForm;