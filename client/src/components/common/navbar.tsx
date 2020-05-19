import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

function Navbar(props: any) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-wrapper">
            <Link to="/"><h2><span className="dark-igc-gray-bg badge text-light">IG Coder</span></h2></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={() => {
                        }}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={() => {
                        }}>About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={() => {
                        }}>Features</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={() => {
                        }}>Contact</Link>
                    </li>
                </ul>
                <form className="navbar-form" role="search">
                    <div className="search">
                        <input type="text" className="form-control" placeholder="Search" name="ig-q"/>
                        <span className="dark-igc-gray-text oi oi-magnifying-glass"></span>
                    </div>
                </form>
            </div>
        </nav>
    );
}

export default Navbar;
