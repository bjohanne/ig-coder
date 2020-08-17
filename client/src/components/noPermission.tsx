import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import pageTitles from "../core/config/pageTitles";

function NoPermissionComponent(props: any) {
    useEffect(() => {
        document.title = pageTitles.prefix + pageTitles.noPermission;
    });

    return (
        <div>
            <h1>Psst!</h1>
            <hr/>
            <Row>
                <Col>
                    <p>You don't have permission to view this page.</p>
                    <p>Please contact the project owner if you believe you should have permission.</p>
                </Col>
            </Row>
        </div>
    );
}

export default NoPermissionComponent;
