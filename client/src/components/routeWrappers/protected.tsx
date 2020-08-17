import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/*
 Wrapper for <Route> that redirects to the login page if the user isn't authenticated.
 */

export function ProtectedRoute({ auth, component: Component, ...rest }) {
    return (
        <Route {...rest} render={props =>
                !auth.isEmpty ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location }}}/>
                )
        }/>
    );
}

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps,null)(ProtectedRoute);
