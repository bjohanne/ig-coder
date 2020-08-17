import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import FormHelperText from "@material-ui/core/FormHelperText";

function PasswordReset(props: any) {
    return (
        <Container>
            <Row className="text-center">
                <Col>
                    <h2 className="home-title">
                        Reset your password
                    </h2>
                </Col>
            </Row>

            <Row>
                <Col sm={2} md={3}></Col>

                <Col sm={8} md={6}>
                    <p>
                    If you've forgotten your password, enter your email address here and we'll send you a link you can use to reset your password.
                    </p>
                    <hr/>
                    <Form onSubmit={props.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Please enter your email address"
                                required
                                name="username"
                                value={props.data.username}
                                onChange={props.handleChange}
                                autoComplete="email"
                                autoFocus
                            />
                            <FormHelperText
                                id="component-error-text"
                                style={{display:props.data.isFail?'block':'none'}}
                                error={props.data.isFail}>{props.data.failText}
                            </FormHelperText>
                        </Form.Group>

                        <Row className="d-flex align-items-center mb-1 mb-sm-3">
                            <Col xs={12} sm={8} lg={6} className="mb-3 mb-sm-0">
                                <Button variant="primary" type="submit" className="w-100" ref={props.submitButton}>
                                    Send reset email
                                    {props.loading && <Spinner animation="border" variant="light" size="sm"
                                        className="ml-3" role="status" />}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col sm={2} md={3}></Col>
            </Row>
        </Container>
    );
}

export default PasswordReset
