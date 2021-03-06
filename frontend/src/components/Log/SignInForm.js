import axios from 'axios';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';


function SignInForm() {

    const alert = useAlert();

    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onTouched'
    });
    const {isSubmitting} = errors;

    const onSubmit = data => {
        axios.post(`${process.env.REACT_APP_URL}api/auth/login`,
        {email: data.email, password: data.password })
        .then(res => {
            console.log(res.data);
            const storageToken = {
                "token": res.data.token,
            }
            sessionStorage.setItem('storageToken', JSON.stringify(storageToken));     
            window.location = '/';
        })
        .catch(function(error){
            console.log(error.response.data.error);
            alert.show('Utilisateur ou mot de passe incorrect');
        })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='email'>Email</label>
            <br />
            <input type='text' name='email' id='email' placeholder='johndoe@groupomania.com'{...register('email', {required: true, pattern: /^[a-z0-9](\.?[a-z0-9]){1,15}@groupomania\.com$/})} />
            <div className='error'>{errors.email?.type === 'required' && "Vous devez entrer une adresse mail"}</div>
            <div className='error'>{errors.email?.type === 'pattern' && "Votre adresse mail ne respecte pas le format requis"}</div>
            <br />

            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type='password' name='password' id='password' placeholder='Mot de passe' {...register('password', {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/})} />
            <div className='error'>{errors.password?.type === 'required' && "Vous devez entrer un mot de passe"}</div>
            <div className='error'>{errors.password?.type === 'pattern' && "Votre mot de passe ne respecte pas le format requis"}</div>
            <br />

            <button type='submit' disabled={isSubmitting}>Se connecter</button>

        </form>
    );
    
};

export default SignInForm;