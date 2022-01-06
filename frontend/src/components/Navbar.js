import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink exact to='/' aria-label="retour à l'accueil">
                        <div className='logo'>
                            <img src='./images/icon-white.png' className='logoGrp' alt='Logo de Groupomania' />
                            <h1 className='titleNav'>Groupomania</h1>
                        </div>
                    </NavLink>
                </div>
                
            </div>
        </nav>
    );
};

export default Navbar;