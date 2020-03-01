import React from "react";
import { connect } from "react-redux";
import GraphComponent from "./graph";

/*
  Currently, this component just renders the Graph component.
  In the future, however, we plan to implement multiple trees per document,
  in which case this component would be expanded.
*/
export function EntryComponent(props: any) {
    return (
		<GraphComponent document={props.document}/>
    );
}

export default connect(
)(EntryComponent);
