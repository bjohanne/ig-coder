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

    const junctionHtml = () => {
        return <>
            <p>A Junction node represents a logical combination of its two child nodes, i.e., horizontal nesting.</p>
        </>;
    }

    const negatedHtml = () => {
        return <>
            <p>If the source text has a negative meaning, e.g., it includes a word like "not", mark the node as Negated
                and include any such words in your coding.</p>
        </>;
    }

    const textContentHtml = (type: "component" | "junction" | "property") => {
        if (usePrefixSuffix) {
            if (type === "junction") {
                return <>
                    <p>For Junction nodes, you code the source text that signals a logical relationship,
                        commonly a simple "and" or "or". Place this in the Main slot if you are copying the source text verbatim,
                        otherwise the Inferred/Rephrased slot. You may use other slots in addition but please note that
                        at least one of the Main and Inferred/Rephrased slots must be used.</p>
                    {negatedHtml()}
                </>;
            }
            return <>
                <p>Text content is divided into slots. Use the Main slot for the text that most narrowly fits the {type}.
                The Prefix slot can hold prepositions or articles that precede the main part.
                Similarly, the Suffix slot can hold prepositions or other text that succeeds the main part.</p>
                <p>The Inferred/Rephrased slot has multiple uses: you might use it for explicitly specifying an
                    inferred component, rephrasing the source text or a combination of both.</p>
                {negatedHtml()}
            </>;
        } else {
            if (type === "junction") {
                return <>
                    <p>For Junction nodes, you code the source text that signals a logical relationship,
                        commonly a simple "and" or "or". Place this in the Main slot if you are copying the source text verbatim,
                        otherwise the Inferred/Rephrased slot.</p>
                    {negatedHtml()}
                </>;
            }
            return <>
                <p>Text content is divided into slots. Place the entire source text of the {type} in the Main slot,
                    including any prepositions and articles.</p>
                <p>The Inferred/Rephrased slot has multiple uses: you might use it for explicitly specifying an
                    inferred component, rephrasing the source text or a combination of both.</p>
                {negatedHtml()}
            </>;
        }
    }

    const displayHelpText = () => {
        if (activeNode && activeNode.nodeType) {
            switch (activeNode.nodeType) {
                case NodeType.regulativestatement:
                    return <>
                        The components of a regulative statement are represented by its child nodes, which you can see here.
                        Optional components can be toggled on and off using the Create/Delete buttons.
                    </>;
                case NodeType.constitutivestatement:
                    return <>
                        The components of a constitutive statement are represented by its child nodes, which you can see here.
                        Optional components can be toggled on and off using the Create/Delete buttons.
                    </>;
                case NodeType.statementjunction:
                    return <>
                        {junctionHtml()}
                        {textContentHtml("junction")}
                    </>;
                case NodeType.componentjunction:
                    return <>
                        {junctionHtml()}
                        {textContentHtml("junction")}
                    </>;
                case NodeType.propertyjunction:
                    return <>
                        {junctionHtml()}
                        {textContentHtml("junction")}
                    </>;
                case NodeType.component:
                    return <>
                        {(activeNode as ComponentNode).componentType === ComponentType.activationconditions ?
                            <>
                                <p>An Activation Conditions node holds a list of activation conditions,
                                    each represented by a child node. If there are none, a default child node
                                    holds the implied condition "under all circumstances". Creating a new child node
                                    will automatically delete the default node, and deleting the last child node
                                    will automatically create the default node.</p>
                                <p>Conditions that are not nested statements can be coded using a Component node of
                                    type<br/>Simple Context.</p>
                            </>
                            :
                            (activeNode as ComponentNode).componentType === ComponentType.executionconstraints ?
                                <>
                                    <p>An Execution Constraints node holds a list of execution constraints,
                                        each represented by a child node. If there are none, a default child node
                                        holds the implied constraint "no constraints". Creating a new child node
                                        will automatically delete the default node, and deleting the last child node
                                        will automatically create the default node.</p>
                                    <p>Constraints that are not nested statements can be coded using a Component node of
                                        type<br/>Simple Context.</p>
                                </>
                                :
                                [ComponentType.orelse, ComponentType.aim, ComponentType.constitutivefunction]
                                    .includes((activeNode as ComponentNode).componentType) ?
                                <>
                                    <p>This component type can have either text content or a child node, not both.
                                    To add one, you must first remove the other.</p>
                                    {textContentHtml("component")}
                                </>
                                    :
                                    [ComponentType.attribute, ComponentType.directobject, ComponentType.indirectobject,
                                        ComponentType.constitutingproperties, ComponentType.constitutedentity]
                                        .includes((activeNode as ComponentNode).componentType) ?
                                        <>
                                            <p>This component type can have Property child nodes. It can have multiple
                                                Property child nodes, representing a list of properties, while also having
                                                text content itself. Property Junction nodes can be used as well, to specify
                                                logical relationships between properties.</p>
                                            <p>Otherwise, it can have either text content or a child node, not both.</p>
                                            {textContentHtml("component")}
                                        </>
                                        :   // Deontic/Modal/SimpleContext
                                        <>
                                            <p>This component type cannot have child nodes, only text content.</p>
                                            {textContentHtml("property")}
                                        </>
                        }
                    </>;
                case NodeType.property:
                    return <>
                        <p>A Property node can be used to represent a simple property, or as a building block in a
                            more complicated property hierarchy. To support this, it can have a Property or Property
                            Junction child node and text content simultaneously.</p>
                        {textContentHtml("property")}
                    </>;
                default:
                    console.error("Invalid node type for active node: " + activeNode.nodeType);
                    return <></>;
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
