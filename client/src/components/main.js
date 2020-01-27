import React, { useEffect } from "react";
import { connect } from "react-redux";
import { testAction } from "../state/actions";

function TestComponent(props) {
    useEffect(() =>         
        props.testAction()
    , [props]);
    return (
        <div>
        <h1>The test component will;</h1><h3>{props.test}</h3>
        </div>
    );
}

const mapStateToProps = state => ({
  test: state.reducer.test
});

const mapDispatchToProps = dispatch => ({
    testAction: () => dispatch(testAction())
}); 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);