import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [service, setService] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {

    }

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
            <input type='text' name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
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