import React from "react";
import {connect} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";

import "./navbar.css";
import {signOut} from "../../state/user/actions";
import {openSnackbar} from "../../state/ui/actions";
import Preferences from "./preferences";

export function NavbarComponent(props) {
    const history=useHistory()

    const {
        auth, loading, signOut, openSnackbar,
        inManagementMode
    } = props;

    const handleSignout=()=>{
        signOut(
            () => {
                history.push("/")
                openSnackbar()
            },
            () => {
                openSnackbar()
            }
        );
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <Link to="/">
                    <h2>
                        <span className="dark-igc-gray-bg badge text-light">IG Coder</span>
                    </h2>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                    {inManagementMode ?
                        <div>
                        {!auth.isEmpty ?
                            <Nav className="mr-auto" id="navbar-nav">
                                <Link className="nav-link" to="/">Home</Link>
                                <Link className="nav-link" to="#">My profile</Link>
                                <Link className="nav-link" to="/projects/myprojects">My projects </Link>
                                <Nav.Link onClick={handleSignout}>
                                    Sign out
                                    {loading && <Spinner animation="border" size="sm" className="ml-2" role="status"/>}
                                </Nav.Link>
                            </Nav>
                            :
                            <Nav className="mr-auto">
                                <Link className="text-dark" to="/login">Sign in</Link>
                            </Nav>
                        }
                        </div>
                    :
                    <Nav className="mr-auto">
                        <Preferences/>
                    </Nav>
                    }
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth,
    loading: state.user.loading,
    inManagementMode: state.appSettings.mode.management
});

const mapDispatchToProps = (dispatch: any) => ({
    signOut: (onSuccess, onError) => dispatch(signOut(onSuccess, onError)),
    openSnackbar: () => dispatch(openSnackbar())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarComponent);
