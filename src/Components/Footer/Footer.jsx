import React from 'react';
import './Footer.css';
import emailIcon from './footer_email.png';

function Footer() {
    return (
        <footer>
            <div className="left">
                <img src={emailIcon} alt="Email Icon" />
                <p>supershop@supershop.com</p>
            </div>
            <p className="right">&copy; 2023 Super Shop Website</p>
        </footer>
    );
}

export default Footer;