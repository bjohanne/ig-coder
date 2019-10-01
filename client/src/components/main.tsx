import React, { useEffect } from "react";
import { connect } from "react-redux";
import { testAction } from "../state/actions";

function TestComponent(props: any) {
  useEffect(() =>
    props.testAction()
  , [props]);
  return (
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <h1>The test component will;</h1><h3>{props.test}</h3>
        </div>
        <div className="col-md-4"></div> 
    </div>

  );
}

const mapStateToProps = (state: any) => ({
  test: state.reducer.test
});

const mapDispatchToProps = (dispatch: any) => ({
  testAction: () => dispatch(testAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);
