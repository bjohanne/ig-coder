import React from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

/*
 Wrapper that ensures Firebase Auth is loaded before the appSettings is accessible.
 */

export function AuthLoader(props) {

    if (!props.auth.isLoaded) { // 
        return (
            <div className="h-100 d-flex align-items-center justify-content-center">
                <Spinner animation="border" variant="primary" role="status" />
            </div>
        );
    }

    return props.children;
}

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps,null)(AuthLoader);
