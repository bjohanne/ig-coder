import React from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function LoginComponent(props: any) {
    return (
        <div className="Container">
            <br/>
            <div className="row text-center">
                <div className="col-md-12">
                    <h1 className="home-title">
                        Login
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
                            <Form.Control type="email" placeholder="Please enter email" />
                        </Form.Group>
                        <br />

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confrim Password</Form.Label>
                            
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Please enter password"
                                    aria-label="Please enter password"
                                    aria-describedby="basic-addon2"
                                    type="password"
                                />
                                <InputGroup.Append>
                                    <Button variant="secondary">Show password</Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>

                        </Form.Group>

                        <br/>
                        <Row>


                            <Col>
                            <Button variant='outline-dark' type="submit" ml-auto>
                                Login
                            </Button>
                            </Col>

                            <Col xs={0} ml-auto>
                            <a href='./register' ml-auto>No account? Go for register</a>
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


