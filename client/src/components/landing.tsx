import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./home.css";
import pageTitles from "../core/config/pageTitles";

/*
 * The Landing page is shown when the management layer is ON and the user is NOT logged in.
 */
export function LandingComponent(props) {
    useEffect(() => {
        document.title = pageTitles.prefix + pageTitles.landing;
	});

    return (
        <div className="home-root text-center">
            <Row>
                <Col>
                    <h1 className="home-title">Welcome to IG Coder!</h1>
                    <p>Please <Link to="/login">sign in</Link> or <Link to="/register">sign up</Link> to get started.</p>
                </Col>
            </Row>
        </div>
    );
}

export default connect(null,null)(withRouter(LandingComponent));
