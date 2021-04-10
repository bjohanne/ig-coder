import React from "react";
import {connect} from "react-redux";
import {QuestionCircleFill} from 'react-bootstrap-icons';
import {INode} from "../../../core/model/interfaces";
import {ComponentType, NodeType} from "../../../core/model/enums";
import {ComponentNode} from "../../../core/model/nodes";
import "../editor.css";

interface IProps {
    activeNode: INode,
    usePrefixSuffix: Boolean
}

/**
 * Help text is shown in an invisible box that becomes visible on hovering over an icon (done with CSS only).
 * Checks activeNode and displays a string based on the node type and component type if applicable.
 */
const HelpTextComponent = (props: IProps) => {
    const {
        activeNode,
        usePrefixSuffix
    } = props;

    const TextContentHtml = () => {
        // Todo: Give an example. Explain the inferredRephrased slot.
        if (usePrefixSuffix) {
            return <>
                The Prefix slot can be filled with prepositions or articles that precede the main component.<br/>
                Similarly, the Suffix slot can be filled with such text that succeeds the main component.<br/>
            </>;
        } else {
            return <>
                Place the entire text of the component in the Main slot, even if it contains prepositions or articles.<br/>
            </>;
        }
    }

    const displayHelpText = () => {
        if (activeNode && activeNode.nodeType) {
            switch (activeNode.nodeType) {
                case NodeType.regulativestatement:
                    return <>
                        Help text
                    </>;
                case NodeType.constitutivestatement:
                    return <>
                        Help text
                    </>;
                case NodeType.statementjunction:
                    return <>
                        {TextContentHtml()}
                        Help text
                    </>;
                case NodeType.componentjunction:
                    return <>
                        {TextContentHtml()}
                        Help text
                    </>;
                case NodeType.propertyjunction:
                    return <>
                        {TextContentHtml()}
                        Help text
                    </>;
                case NodeType.component:
                    return <>
                        {![ComponentType.activationconditions, ComponentType.executionconstraints]
                            .includes((activeNode as ComponentNode).componentType) &&
                        TextContentHtml()}
                        {/* If ActivationConditions/ExecutionConstraints (can never have text content):
                            Creating a new child node will automatically delete the default child node.
                            Also, deleting the last child node will automatically create the default child node.

                            If OrElse/Aim/ConFunc:
                            Warn that it cannot have both children and text content, only one of the two.

                            If Attribute/DirObj/IndirObj/ConProp/ConEnt:
                            Notify that this component type can have Property/PropertyJunction children and text content simultaneously,
                            but not text content and children of other types.

                            If Deontic/Modal/SimpleContext (can never have children):
                            Nothing extra.
                        */}
                        Help text
                    </>;
                case NodeType.property:
                    return <>
                        {TextContentHtml()}
                        {/*
                            Can have a child and text content simultaneously, but only if its child is either Property
                            or PropertyJunction.
                        */}
                        Help text
                    </>;
                default:
                    console.error("Invalid node type for active node: " + activeNode.nodeType);
                    return null;
            }
        }
        return null;
    }

    return (
        <div className="d-flex flex-column align-items-end">
            <QuestionCircleFill className="dark-igc-gray-txt question-mark mb-2" size={30}/>
            <small className="help-text">{displayHelpText()}</small>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    activeNode: state.documents.activeNode,
    usePrefixSuffix: state.appSettings.preferences.usePrefixSuffix
});

export default connect(
    mapStateToProps,
    null
)(HelpTextComponent);
