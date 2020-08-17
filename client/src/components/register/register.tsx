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

function RegisterComponent(props) {
    return (
        <Container>
            <Row className="text-center">
                <Col>
                    <h1 className="home-title">
                        Sign up
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col sm={2} md={3}></Col>

                <Col sm={8} md={6}>
                    <Form onSubmit={props.handleSubmit}>
                        <Row className="mr-0">
                            <Col>
                                <Form.Group controlId="formFirstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your first name"
                                        required
                                        name="firstname"
                                        value={props.data.firstname}
                                        onChange={props.handleChange}
                                        autoFocus
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formLastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your last name"
                                        required
                                        name="lastname"
                                        value={props.data.lastname}
                                        onChange={props.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Your email address"
                                required
                                name="username"
                                value={props.data.username}
                                onChange={props.handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type={props.data.showPassword ? 'text' : 'password'}
                                    placeholder="Please create a password"
                                    required
                                    name="pass"
                                    value={props.data.pass}
                                    onChange={props.handleChange}
                                />
                                <InputGroup.Append>
                                    <Button variant="secondary"
                                            onClick={props.handleClickShowPassword}
                                            style={{width:"70px"}}
                                    >
                                        {props.data.showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm password</Form.Label>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    type={props.data.showPassword ? 'text' : 'password'}
                                    placeholder="Please reenter your password"
                                    required
                                    name="passConfirm"
                                    value={props.data.passConfirm}
                                    onChange={props.handleChange}
                                />
                                <InputGroup.Append>
                                    <Button variant="secondary"
                                            onClick={props.handleClickShowPassword}
                                            style={{width:"70px"}}
                                    >
                                        {props.data.showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <FormHelperText
                                id="component-error-text"
                                style={{display:props.data.isFail?'block':'none'}}
                                error={props.data.isFail}>{props.data.failText}
                            </FormHelperText>
                        </Form.Group>

                        <Row className="d-flex align-items-center mb-1 mb-sm-3">
                            <Col xs={12} sm={5} lg={4} className="mb-3 mb-sm-0">
                                <Button variant="primary" type="submit" className="w-100" ref={props.submitButton}>
                                    Sign up
                                    {props.loading && <Spinner animation="border" variant="light" size="sm"
                                        className="ml-3" role="status" />}
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    <p><Link to="./login">Already have an account? Sign in</Link></p>
                </Col>
                <Col sm={2} md={3}></Col>
            </Row>
        </Container>
    );
}

export default RegisterComponent
