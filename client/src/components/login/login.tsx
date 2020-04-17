import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormHelperText from "@material-ui/core/FormHelperText";

function LoginComponent(props: any) {
    return (
        <div className="Container">
            <div className="row text-center">
                <div className="col-md-12">
                    <h1 className="home-title">
                        Sign in
                    </h1>
                </div>
            </div>

            <div className="row">
                <div className='col-md-4'>
                </div>

                <div className='col-md-4'>

                    <Form>
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
                                    >
                                        {props.data.showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputGroup.Append>
                                <FormHelperText id="component-error-text" style={{display:props.data.isFail?'block':'none'}} error={props.data.isFail}>{props.data.failText}</FormHelperText>
                            </InputGroup>

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>

                        </Form.Group>

                        <Row className="d-flex align-items-center">
                            <Col>
                            <Button
                                variant='outline-dark'
                                type="submit"
                                className="ml-auto w-75"
                                onClick={props.handleSubmit}
                            >
                                Sign in
                            </Button>
                            </Col>

                            <Col xs={0} >
                            <a href='./register' className="ml-auto">Don't have an account? Sign up</a>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>

                <div className='col-md-4'>
                </div>

        </div>
    );
}

export default LoginComponent
