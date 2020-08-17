import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import DashboardComponent from "../dashboard";
import LandingComponent from "../landing";

/*
 Wrapper for <Route> that determines which home page to render out of Dashboard and Landing.
 */

export function HomeRoute({ auth, ...rest }) {
    return (
        <Route {...rest} render={props =>
                !auth.isEmpty ? (
                    <DashboardComponent {...props} />
                ) : (
                    <LandingComponent {...props} />
                )
        }/>
    );
}

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps,null)(HomeRoute);
