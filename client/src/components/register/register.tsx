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
                        Register
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
                            <Form.Label>Password</Form.Label>
                            
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
                                <small id="passwordHelpBlock" className="form-text text-muted">
                                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                </small>
                                
                                </InputGroup>

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confrim Password</Form.Label>
                            
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Please confrim password"
                                    aria-label="Please comfirm password"
                                    aria-describedby="basic-addon2"
                                    type="password"
                                />
                                <InputGroup.Append>
                                    <Button variant="secondary">Show password</Button>
                                </InputGroup.Append>
                                
                                </InputGroup>

                        </Form.Group>

                        {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group> */}
                        <br/>
                        <Row>


                            <Col>
                            <Button variant='outline-dark' type="submit" ml-auto>
                                Register
                            </Button>
                            </Col>

                            <Col xs={4}>
                            <a href='./login' ml-auto>Go for Login</a>
                            </Col>

                        </Row>

                        
                    </Form>


                </div>

                <div className='col-md-4'>
                </div>
            </div> 

        </div>
    );
}

export default LoginComponent


