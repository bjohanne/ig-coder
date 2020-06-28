import React from "react";
import {connect} from "react-redux";
import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import './navbar.css';
import {IconButton,Menu,MenuItem,Fade,ListItemIcon,Typography} from "@material-ui/core";
import {AccountCircle, Delete} from '@material-ui/icons'
import {updateLoginState} from "../../state/actions";
import * as firebase from "firebase/app";

function Navbar(props: any) {
    const [anchorEl, setAnchorEl]=useState(null)

    // useEffect(()=>{
    //     var user = firebase.auth().currentUser;
    //     console.log('currentuser:'+user)
    //     if (user) {
    //         props.updateLoginState(true)
    //     } else {
    //         // No user is signed in.
    //         props.updateLoginState(false)
    //     }
    // },[])

    const handleMenu=(event)=>{
        setAnchorEl(event.target)
    }

    const handleClose=()=>{
        setAnchorEl(null)
    }

    const handleSignout=()=>{
        setAnchorEl(null)
        firebase.auth().signOut().then(function() {
            props.updateLoginState(false)
            window.location.href = "/";

        }).catch(function(error) {
            console.log('sign out error: '+error)
        });




    }
    const loginState=props.loginState

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-wrapper">
            <Link to="/"><h2><span className="dark-igc-gray-bg badge text-light">IG Coder</span></h2></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                {/*<ul className="navbar-nav ml-auto">*/}
                {/*    <li className="nav-item">*/}
                {/*        <Link className="nav-link" to="/" onClick={() => {*/}
                {/*        }}>Home</Link>*/}
                {/*    </li>*/}
                {/*    <li className="nav-item">*/}
                {/*        <Link className="nav-link" to="/" onClick={() => {*/}
                {/*        }}>About</Link>*/}
                {/*    </li>*/}
                {/*    <li className="nav-item">*/}
                {/*        <Link className="nav-link" to="/" onClick={() => {*/}
                {/*        }}>Features</Link>*/}
                {/*    </li>*/}
                {/*    <li className="nav-item">*/}
                {/*        <Link className="nav-link" to="/" onClick={() => {*/}
                {/*        }}>Contact</Link>*/}
                {/*    </li>*/}
                {/*</ul>*/}
				{/*<form className="navbar-form ml-3" role="search">*/}
                {/*    <div className="search">*/}
                {/*        <input type="text" className="form-control" placeholder="Search" name="ig-q"/>*/}
                {/*        <span className="dark-igc-gray-text oi oi-magnifying-glass"></span>*/}
                {/*    </div>*/}
                {/*</form>*/}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item" style={{display:!loginState?"block":'none'}}>
                        <Link className="nav-link" to="/login" onClick={() => {
                        }}>Login/Register</Link>
                    </li>
                    <li className="nav-item">
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            style={{display:loginState?"block":'none'}}
                        >
                            <AccountCircle style={{color:'#8190A5'}}fontSize={'large'}/>
                        </IconButton>

                    </li>
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
                    <MenuItem onClick={handleClose}>My profiles</MenuItem>
                </Link>
                <Link to="/projects/myprojects">
                    <MenuItem onClick={handleClose}>My projects</MenuItem>
                </Link>
                <div className="dropdown-divider"></div>
                <MenuItem onClick={handleSignout}>Sign out</MenuItem>
            </Menu>
        </nav>
    );
}
const mapStateToProps = (state: any) => ({
    loginState: state.reducer.loginState
});

const mapDispatchToProps = (dispatch: any) => ({
    updateLoginState: (loginState: any) => dispatch(updateLoginState(loginState))
});

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
