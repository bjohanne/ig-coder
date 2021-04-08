import React from "react";
import {connect} from "react-redux";
import {QuestionCircleFill} from 'react-bootstrap-icons';
import {INode} from "../../../core/model/interfaces";
import {NodeType} from "../../../core/model/enums";
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
                        Help text
                    </>;
                case NodeType.componentjunction:
                    return <>
                        Help text
                    </>;
                case NodeType.propertyjunction:
                    return <>
                        Help text
                    </>;
                case NodeType.component:
                    if (usePrefixSuffix) {
                        return <>
                            The Prefix slot can be filled with prepositions or articles that precede the main component.<br/>
                            Similarly, the Suffix slot can be filled with such text that succeeds the main component.
                        </>
                    }
                    return <>
                        Place the entire text of the component in the Main slot, even if it contains prepositions or articles.
                    </>;
                case NodeType.property:
                    return <>
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
        <>
            <QuestionCircleFill className="dark-igc-gray-txt question-mark" size={28}/>
            <small className="help-text">{displayHelpText()}</small>
        </>
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
