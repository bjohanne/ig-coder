import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import {ILocationState} from "../../core/config/interfaces";

/*
 Wrapper for <Route> that redirects to the home page or previous page if the user is authenticated.
 For the /login and /register routes.
 */

export function AuthenticationRoute({ auth, component: Component, ...rest }) {
    const location = useLocation<ILocationState>();
    const { from } = location.state || { from: { pathname: "/" } };

    return (
        <Route {...rest} render={props =>
                !auth.isEmpty ? (
                    <Redirect to={from}/>
                ) : (
                    <Component {...rest} {...props} />
                )
        }/>
    );
}

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps,null)(AuthenticationRoute);
