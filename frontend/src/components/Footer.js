import React from 'react';

const Footer = () => {
    return (
    <div className="footer-basic">
        <footer>
            <div className="social"><i className="fab fa-instagram"></i><i className="fab fa-facebook"></i><i className="fab fa-twitter"></i><i className="fab fa-snapchat"></i></div>
            <ul className="list-inline">
                
                <li className="list-inline-item">Services</li>
                <li className="list-inline-item">À propos</li>
                <li className="list-inline-item">Mentions légales</li>
                <li className="list-inline-item">Politique de confidentialité</li>
            </ul>
            <p className="copyright">Groupomania © 2022</p>
        </footer>
    </div>
    );
};

export default Footer;