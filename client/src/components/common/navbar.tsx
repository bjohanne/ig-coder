import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {IconButton,Menu,MenuItem,Fade} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import Spinner from "react-bootstrap/Spinner";

import "./navbar.css";
import {signOut} from "../../state/user/actions";
import {openSnackbar} from "../../state/ui/actions";

export function Navbar(props) {
    const {auth, loading, signOut, openSnackbar} = props;

    const [anchorEl, setAnchorEl]=useState(null)

    const history=useHistory()

    const handleMenu=(event)=>{
        setAnchorEl(event.target)
    }

    const handleClose=()=>{
        setAnchorEl(null)
    }

    const handleSignout=()=>{
        signOut(
            () => {
                setAnchorEl(null)
                history.push("/")
                openSnackbar()
            },
            (errorMsg) => {
                openSnackbar()
            }
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-wrapper">
            <Link to="/">
                <h2>
                    <span className="dark-igc-gray-bg badge text-light">IG Coder</span>
                </h2>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
				{/*<form className="navbar-form ml-3" role="search">*/}
                {/*    <div className="search">*/}
                {/*        <input type="text" className="form-control" placeholder="Search" name="ig-q"/>*/}
                {/*        <span className="dark-igc-gray-text oi oi-magnifying-glass"></span>*/}
                {/*    </div>*/}
                {/*</form>*/}
                <ul className="navbar-nav ml-auto">
                    {!auth.isEmpty ?
                    <li className="nav-item">
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            className="p-0"
                        >
                            <AccountCircle style={{color:"#8190A5"}} fontSize={"large"}/>
                        </IconButton>
                    </li>
                    :
                    <li className="nav-item">
                        <Link className="text-dark" to="/login">Sign in</Link>
                    </li>
                    }
                </ul>
            </div>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <Link to="#">
                    <MenuItem onClick={handleClose}>My profile</MenuItem>
                </Link>
                <Link to="/projects/myprojects">
                    <MenuItem onClick={handleClose}>My projects</MenuItem>
                </Link>
                <div className="dropdown-divider"></div>
                <MenuItem onClick={handleSignout}>
                    Sign out
                    {loading && <Spinner animation="border" variant="primary" size="sm"
                        className="ml-2" role="status" />}
                </MenuItem>
            </Menu>
        </nav>
    );
}

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth,
    loading: state.user.loading
});

const mapDispatchToProps = (dispatch: any) => ({
    signOut: (onSuccess, onError) => dispatch(signOut(onSuccess, onError)),
    openSnackbar: () => dispatch(openSnackbar())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
