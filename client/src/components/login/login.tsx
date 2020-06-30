import React from "react";
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import FormHelperText from "@material-ui/core/FormHelperText";

function LoginComponent(props: any) {
    return (
        <Container>
            <Row className="text-center">
                <Col>
                    <h1 className="home-title">
                        Sign in
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col sm={2} md={3}></Col>

                <Col sm={8} md={6}>
                    <Form onSubmit={props.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Please enter email address"
                                required
                                name="username"
                                value={props.data.username}
                                onChange={props.handleChange}
                                autoComplete="email"
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    type={props.data.showPassword ? 'text' : 'password'}
                                    placeholder="Please enter password"
                                    required
                                    name="pass"
                                    value={props.data.pass}
                                    onChange={props.handleChange}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="secondary"
                                        onClick={props.handleClickShowPassword}
                                        style={{width:"70px"}}
                                    >
                                        {props.data.showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <FormHelperText id="component-error-text" style={{display:props.data.isFail?'block':'none'}} error={props.data.isFail}>{props.data.failText}</FormHelperText>

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>

                        </Form.Group>

                        <Row className="d-flex align-items-center">
                            <Col xs={12} sm={5} lg={4} className="mb-3 mb-sm-0">
                                <Button variant="primary" type="submit" className="w-100" ref={props.submitButton}>
                                    Sign in
                                    {props.loading && <Spinner animation="border" variant="light" size="sm" className="ml-3" />}
                                </Button>
                            </Col>
                            <Col xs={12} sm={7} lg={8}>
                                <Link to="/register">Don't have an account? Sign up</Link>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col sm={2} md={3}></Col>
            </Row>
        </Container>
    );
}

export default LoginComponent
