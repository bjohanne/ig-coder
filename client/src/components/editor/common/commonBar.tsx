import React from "react";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NegatedComponent from "./negated";
import HelpTextComponent from "./helpText";

/**
 * This component encapsulates NegatedComponent and HelpTextComponent, and
 * is shown in all node type editors.
 */
const CommonBarComponent = (props) => {

    return (
        <Row>
            <Col>
                <NegatedComponent>

                </NegatedComponent>
            </Col>
            <Col>
                <HelpTextComponent>

                </HelpTextComponent>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonBarComponent);

