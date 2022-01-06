import axios from 'axios';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import SignInForm from './SignInForm';

function SignUpForm () {
    const [formSubmit, setFromSubmit] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onTouched'
    });
    const {isSubmitting} = errors;

const onSubmit =  data => {
    axios.post(`${process.env.REACT_APP_URL}api/auth/signup`,
    {lastName: data.lastName, firstName: data.firstName, email: data.email, password: data.password })
    .then(res => {
        setFromSubmit(true);
        console.log(res.data);
        const storageToken = {
            "userId": res.data.userId,
            "token": res.data.token
        }
        sessionStorage.setItem('storageToken', JSON.stringify(storageToken));
    })
    .catch(err => { 'Erreur dans la soumission du formulaire d\'inscription'});
}

console.log(errors);

    return (
        <>
        {formSubmit ? (
            <>
            <SignInForm />
            <span></span>
            <h4 className='success'>Enregistrement réussi, veuillez vous connecter</h4>
            </>
        ) : (       
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='lastName'>Nom</label>
            <br />
            <input type='text' name='lastName' id='lastName' placeholder='Doe' {...register('lastName', {required: true, minLength: 3, pattern: (/^[a-zA-Z\s'\-àáâãäæçèéêëìíîïñòóôõöùúûüýÿœÀÁÂÃÄÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÜŒ]+$/g)})} />
            
            <div className='error'>{errors.lastName?.type === 'required' && "Vous devez entrer un nom"}</div>
            <div className='error'>{errors.lastName?.type === 'minLength' && "Ce champ doit comprendre au moins 3 caractères"}</div>
            <div className='error'>{errors.lastName?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux"}</div>
            <br />

            <label htmlFor='firstName'>Prénom</label>
            <br />
            <input type='text' name='firstName' id='firstName' placeholder='John' {...register('firstName', {required: true, minLength: 3, pattern: (/^[a-zA-Z\-àáâãäæçèéêëìíîïñòóôõöùúûüýÿœÀÁÂÃÄÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÜŒ]+$/g)})}/>
            <div className='error'>{errors.firstName?.type === 'required' && "Vous devez entrer un prénom"}</div>
            <div className='error'>{errors.firstName?.type === 'minLength' && "Ce champ doit comprendre au moins 3 caractères"}</div>
            <div className='error'>{errors.firstName?.type === 'pattern' && "Ce champ ne peut pas comprendre de caractères spéciaux"}</div>
            <br />

            <label htmlFor='email'>Email</label>
            <br />
            <input type='email' name='email' id='email' placeholder='johndoe@groupomania.com' {...register('email', {required: true, pattern: /^[a-z0-9](\.?[a-z0-9]){1,6}@groupomania\.com$/})}/>
            <div className='error'>{errors.email?.type === 'required' && "Vous devez entrer une adresse mail"}</div>
            <div className='error'>{errors.email?.type === 'pattern' && "Veuillez entrer une adresse mail valide"}</div>
            <br />

            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' placeholder='Mot de passe' {...register('password', {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/})}/>
            <div className='error'>{errors.password?.type === 'required' && "Vous devez entrer un mot de passe"}</div>
            <div className='error'>{errors.password?.type === 'pattern' && "Votre mot de passe doit contenir: 8 caractères minimum, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"}</div>
            <br />

            <button type='submit' disabled={isSubmitting}>Valider inscription</button>
        </form>
        )}
        </>
)};


export default SignUpForm;