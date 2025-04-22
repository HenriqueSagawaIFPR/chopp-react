import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './style.css';
import CartButton from '../CartButton';

const Navbar = ({ cartItemCount, onCartClick }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    Chopp React
                </a>
                <div className="navbar-links">
                    <a href="/" className="navbar-link">
                        Home
                    </a>
                    <CartButton itemCount={cartItemCount} onClick={onCartClick} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
