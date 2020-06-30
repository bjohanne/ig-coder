import React from "react";
import {
    Link
} from 'react-router-dom';

function NotFoundComponent(props: any) {
    return (
        <div>
            <h1>Oops!</h1>
            <hr/>
            <div className="row">
                <div className="col-md-6">
                    <p>Dear policy coder,</p>
                    <p>
                        We're terribly sorry, but it appears the page you seek is missing from our website.<br/>
                        Before you head back into the wild web, please double check (!) to be sure you have entered
                        the right URL.<br/>
                        If you're sure it's correct, feel free to email us right now and complain. In the meantime,
                        here's a cat gif for you to enjoy.
                    </p>
                    <Link to="/">
                        <button className="btn btn-dark">Back to homepage</button>
                    </Link>
                </div>
                <div className="col-md-6 text-center">
                    <iframe src="https://giphy.com/embed/MDJ9IbxxvDUQM" width="480" height="270" frameBorder="0"
                            className="giphy-embed" title="Cat gif" allowFullScreen/>
                    <p><a href="https://giphy.com/gifs/cat-kisses-hugs-MDJ9IbxxvDUQM">via GIPHY</a></p>
                </div>
            </div>
        </div>
    );
}

export default NotFoundComponent;
