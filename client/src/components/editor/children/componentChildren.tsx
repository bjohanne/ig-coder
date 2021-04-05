import React from "react";
import {connect} from "react-redux";

const ComponentChildren = (props) => {

    return (
        <>
            ComponentChildren
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
)(ComponentChildren);

