import './home.css'
import React from "react";
import {
    Link
  } from 'react-router-dom';
import appconfig from "../core/config/appconfig";

function HomeComponent(props: any) {
    return (
        <div className="home-root">
            <div className="row">
                <div className="col-md-12">
                    <span className="home-title">
                        The making of IG Coder
                    </span>
                    <h1 className="home-sub-title">Policy Coding - We're trying to make it work!</h1>
                    <Link to={ { pathname: `${appconfig.client.path}/documents/new` } }><button className="btn btn-dark">Create New Document</button></Link>
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;
