import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./home.css";
import pageTitles from "../core/config/pageTitles";

/*
 * The Welcome component is shown when the management layer is OFF.
 * It's made for the testing prototype.
 */
export function WelcomeComponent(props) {

    useEffect(() => {
        document.title = pageTitles.prefix + pageTitles.welcome;
	});

    return (
        <div className="home-root text-center">
            <Row>
                <Col>
                    <h1 className="home-title">Welcome to IG Coder!</h1>
                    <p>Short introductory text</p>
                    <Link to="/documents/1">
                        <Button variant="dark" className="mt-3">Go to the test document</Button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}


export default connect(null,null)(withRouter(WelcomeComponent));
