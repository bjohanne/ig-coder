import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import pageTitles from "../core/config/pageTitles";

function NotLoggedInComponent(props: any) {
    useEffect(() => {
        document.title = pageTitles.prefix + pageTitles.notLoggedIn;
    });

    return (
        <div>
            <h1>Psst!</h1>
            <hr/>
            <Row>
                <Col>
                    <p>You're not signed in. Please do so to view this page.</p>
                    <Link to="/login">
                        <Button variant="primary">Go to sign-in page</Button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default NotLoggedInComponent;
