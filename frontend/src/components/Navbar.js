import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {

    const logout = () => {
        sessionStorage.clear();
    }
    return (
        <nav>
            <div className='nav-container'>
                <div className='logoNav'>
                    <NavLink exact to='/'>
                        <div className='logoNav'>
                            <img src='./images/icon-white.png' className='logoGrp' alt='Logo de Groupomania' />
                            <h1 className='titleNav'>Groupomania</h1>
                        </div>
                    </NavLink>
                </div>

                    <ul>
                        <li></li>
                        <li onClick={logout}>
                            <NavLink exact to='/connect'>
                                <div className='logout'><i className="fas fa-sign-out-alt"></i></div>
                            </NavLink>
                        </li>
                    </ul>
            </div>
        </nav>
    );
};


export default Navbar;