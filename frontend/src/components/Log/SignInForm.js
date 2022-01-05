import axios from 'axios';
import { useForm } from 'react-hook-form';


function SignInForm() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onTouched'
    });
    const {isSubmitting} = errors;

    const onSubmit = data => {
        axios.post(`${process.env.REACT_APP_URL}api/auth/login`,
        {email: data.email, password: data.password })
        .then(res => {
            console.log(res.data);
            window.location = '/feed';
            const storageToken = {
                "userId": res.data.userId,
                "token": res.data.token
            }
            sessionStorage.setItem('storageToken', JSON.stringify(storageToken));
        })
        .catch(err => {"Erreur dans l'authentification"});
    }

console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='email'>Email</label>
            <br />
            <input type='text' name='email' id='email' placeholder='johndoe@gmail.com'{...register('email', {required: true, pattern: /^[\w_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/g})} />
            <div className='error'>{errors.email?.type === 'required' && "Vous devez entrer une adresse mail"}</div>
            <div className='error'>{errors.email?.type === 'pattern' && "Votre adresse mail ou votre mot de passe est invalide"}</div>
            <br />

            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' placeholder='Mot de passe' {...register('password', {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/})} />
            <div className='error'>{errors.password?.type === 'required' && "Vous devez entrer un mot de passe"}</div>
            <div className='error'>{errors.password?.type === 'pattern' && "Votre adresse mail ou votre mot de passe est invalide"}</div>
            <br />

            <button type='submit' disabled={isSubmitting}>Se connecter</button>

        </form>
    );
    
};

export default SignInForm;