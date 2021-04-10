import React from "react";
import {connect} from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {INode} from "../../../core/model/interfaces";
import {NodeType} from "../../../core/model/enums";
import {PropertyNode} from "../../../core/model/nodes";
import ViewChildNode from "../common/viewChildNode";

interface IProps {
    activeNode: PropertyNode
}

const PropertyChildren = (props: IProps) => {
    const {
        activeNode
    } = props;

    const children: INode[] = activeNode.children;

    const addChild = () => {    // Add new child node

    }

    const deleteChild = () => { // Delete fixed child node

    }

    return (
        <>
            {(children.length === 0) ?
                <DropdownButton size="lg" title="Create">
                    <Dropdown.Item data-type={NodeType.regulativestatement} onClick={addChild}>Regulative Statement</Dropdown.Item>
                    <Dropdown.Item data-type={NodeType.constitutivestatement} onClick={addChild}>Constitutive Statement</Dropdown.Item>
                    <Dropdown.Item data-type={NodeType.statementjunction} onClick={addChild}>Statement Junction</Dropdown.Item>
                    <Dropdown.Item data-type={NodeType.propertyjunction} onClick={addChild}>Property Junction</Dropdown.Item>
                    <Dropdown.Item data-type={NodeType.property} onClick={addChild}>Property</Dropdown.Item>
                </DropdownButton>
            :
                <Row noGutters>
                    {children.map((node: INode, i: number) => // It can never have more than 1 child, but we're mapping to be safe
                        <Col key={i} className="mr-2 mb-2" xs="auto">
                            <ViewChildNode node={node} childIndex={i} createSelf={() => {}} deleteSelf={deleteChild}/>
                        </Col>
                    )}
                </Row>
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PropertyChildren);

