import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./home.css";
import pageTitles from "../core/config/pageTitles";

/*
 * The Dashboard component is shown when the management layer is ON and a user is logged in.
 */
export function DashboardComponent(props) {

    useEffect(() => {
        document.title = pageTitles.prefix + pageTitles.dashboard;
	});

    return (
        <div className="home-root text-center">
            <Row>
                <Col>
                    <h1 className="home-title">Welcome to IG Coder!</h1>
                        <Link to="/projects/myprojects">
                            <Button variant="dark" className="mt-3">Browse your projects</Button>
                        </Link>
                </Col>
            </Row>
        </div>
    );
}

export default connect(null,null)(withRouter(DashboardComponent));
