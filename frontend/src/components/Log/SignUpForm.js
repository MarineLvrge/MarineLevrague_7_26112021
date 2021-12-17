import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [service, setService] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms');
        const lastNameError = document.querySelector('.lastNameError');
        const firstNameError = document.querySelector('.firstNameError');
        const serviceError = document.querySelector('.serviceError');
        const emailError = document.querySelector('.emailError');
        const passwordError = document.querySelector('.passwordError');
        const termsError = document.querySelector('.termsError');

        if(!terms.checked) {
            termsError.innerHTML = 'Veuillez valider les conditions générales';
        } else {
            await axios ({
                method: 'POST',
                url: `${process.env.REACT_APP_URL}api/auth/signup`,
                data: {
                    lastName: lastName,
                    firstName: firstName,
                    service: service,
                    email: email,
                    password: password
                }
            })
            .then((res) => {
                console.log(res);
                if(res.data) {
                    lastNameError.innerHTML = 'Erreur dans le nom';
                    firstNameError.innerHTML = 'Erreur dans le prénom';
                    serviceError.innerHTML = 'Erreur dans le service';
                    emailError.innerHTML = 'Erreur dans le mail';
                    passwordError.innerHTML = 'Erreur dans le mot de passe';
                } 
            })
            .catch((err) => console.log(err));
        }
    };

    return (
        <form action='' onSubmit={handleRegister} id='sign-up-form'>
            <label htmlFor='lastName'>Nom</label>
            <br />
            <input type='text' name='lastName' id='lastName' onChange={(e) => setLastName(e.target.value)} value={lastName} />
            <div className='lastNameError'></div>
            <br />

            <label htmlFor='firstName'>Prénom</label>
            <br />
            <input type='text' name='firstName' id='firstName' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            <div className='firstNameError'></div>
            <br />

            <label htmlFor='service'>Service</label>
            <br />
            <input type='text' name='service' id='service' onChange={(e) => setService(e.target.value)} value={service} />
            <div className='serviceError'></div>
            <br />

            <label htmlFor='email'>Email</label>
            <br />
            <input type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className='emailError'></div>
            <br />

            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className='passwordError'></div>
            <br />

            <div className='termsConditions'>
            <input type='checkbox' id='terms' />
            <label htmlFor='terms'>J'accepte les <a href='/' target='_blank' rel='noopener noreferrer'>{' '}conditions générales</a></label>
            </div>
            <div className='termsError'></div>
            <br />

            <input type='submit' value='Valider inscription' />
        </form>
    );
};

export default SignUpForm;