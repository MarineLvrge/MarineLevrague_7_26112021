import React  from 'react';
import EditPost from '../components/Posts/EditPost';


const updatePost = (props) => {

    let session = false;

    if(!sessionStorage.storageToken){
    window.location = '/connect';
    } else session = true;

    //console.log(props.location.data.id_post);

    const id_post = props.location.data.id_post;


if(!session) {
        <div>Vous n'êtes pas autorisé à voir ce contenu</div>
    } else {
        return (
            <section className='bigSection'>
                <div className='editPostContainer'>
                    <EditPost id_post={id_post}/>
                </div>
            </section>
        );
    };
}

export default updatePost;