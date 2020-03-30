import React from "react";
import './navbar.css';

function Navbar(props: any) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-wrapper">
            <a href="/"><h2><span className="dark-igc-gray-bg badge text-light">IG Coder</span></h2></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 ml-3">
                <ul className="navbar-nav justify-content-start">
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={() => {
                        }}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={() => {
                        }}>About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={() => {
                        }}>Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={() => {
                        }}>Contact</a>
                    </li>

                </ul>
                <form className="navbar-form ml-3" role="search">
                    <div className="search">
                        <input type="text" className="form-control" placeholder="Search" name="ig-q"/>
                        <span className="dark-igc-gray-text oi oi-magnifying-glass"></span>
                    </div>
                </form>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/login" onClick={() => {
                        }}>Login/Register</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
