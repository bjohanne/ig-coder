import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import pageTitles from "../core/config/pageTitles";

function NotFoundComponent(props: any) {
    useEffect(() => {
        document.title = pageTitles.prefix + pageTitles.notFound;
	});

    return (
        <div>
            <h1>Oops!</h1>
            <hr/>
            <Row>
                <Col md={7}>
                    <p>Dear policy coder,</p>
                    <p>
                        We're terribly sorry, but it appears the page you've requested is missing from our website.<br/>
                        Before you head back into the wild web, please double check (!) to make sure you've entered
                        the right URL.<br/>
                        If you're sure it's correct, feel free to email us right now and complain. In the meantime,
                        here's a cat gif for you to enjoy.
                    </p>
                    <Link to="/">
                        <Button variant="primary">Back to homepage</Button>
                    </Link>
                </Col>
                <Col md={5} className="text-center">
                    <iframe src="https://giphy.com/embed/MDJ9IbxxvDUQM" width="480" height="270" frameBorder="0"
                            className="giphy-embed" title="Cat gif" allowFullScreen/>
                    <p><a href="https://giphy.com/gifs/cat-kisses-hugs-MDJ9IbxxvDUQM">via GIPHY</a></p>
                </Col>
            </Row>
        </div>
    );
}

export default NotFoundComponent;
