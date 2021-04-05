import React from "react";
import {connect} from "react-redux";

const FunctionallyDependentComponent = (props) => {

    return (
        <>
            FunctionallyDependentComponent
        </>
    )
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FunctionallyDependentComponent);

