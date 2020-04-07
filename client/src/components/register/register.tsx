import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RegisterComponent(props: any) {
    return (
        <div className="Container">
            <div className="row text-center">
                <div className="col-md-12">
                    <h1 className="home-title">
                        Sign up
                    </h1>
                </div>
            </div>

            <div className="row">
                <div className='col'></div>

                <div className='col-md-4'>
                    <Form onSubmit={props.handleSubmit}>
                        <div className="row">
                            <div className="col">
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
                            </div>
                            <div className="col">
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
                            </div>
                        </div>
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
                                    >
                                        Show
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <small id="passwordHelpBlock" className="form-text text-muted">
                                Your password must be at least 8 characters long and contain both letters and numbers.
                            </small>

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
                                    >
                                        Show
                                    </Button>

                                </InputGroup.Append>

                            </InputGroup>

                        </Form.Group>

                        <Row className="d-flex align-items-center">
                            <Col>
                            <Button variant='outline-dark' type="submit" className="ml-auto w-75">
                                Sign up
                            </Button>
                            </Col>

                            <Col xs={0}>
                            <a href='./login' className="ml-auto">Already have an account? Sign in</a>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <div className='col'></div>
            </div>

        </div>
    );
}

export default RegisterComponent
