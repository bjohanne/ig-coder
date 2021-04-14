import {ComponentType, NodeType} from "../model/enums";
import {scaleOrdinal, schemeCategory10, schemeDark2} from "d3";

// Fill color for each component type (overrides color from node type)
// Fixed children: #3aa6dd
// Optional children: #99d2f2
// OrElse: #5abaa7
export const componentColorScaler = scaleOrdinal<string, string>()
.domain([ComponentType.attribute, ComponentType.directobject, ComponentType.indirectobject, ComponentType.deontic, // Regulative
    ComponentType.aim, ComponentType.activationconditions, ComponentType.executionconstraints, ComponentType.orelse,
    ComponentType.constitutingproperties, ComponentType.modal, ComponentType.constitutivefunction,                      // Constitutive
    ComponentType.constitutedentity, ComponentType.activationconditions, ComponentType.executionconstraints, ComponentType.orelse])
    .range(["#3aa6dd", "#99d2f2", "#99d2f2", "#99d2f2", "#3aa6dd", "#3aa6dd", "#3aa6dd", "#5abaa7",
        "#99d2f2", "#99d2f2", "#3aa6dd", "#3aa6dd", "#3aa6dd", "#3aa6dd", "#5abaa7"])

// Border color for each component type (overrides border color from node type)
// Fixed children: #1e74a0
// Optional children: #4485a9
// OrElse: #377c6e
export const componentStrokeColorScaler = scaleOrdinal<string, string>()
    .domain([ComponentType.attribute, ComponentType.directobject, ComponentType.indirectobject, ComponentType.deontic, // Regulative
        ComponentType.aim, ComponentType.activationconditions, ComponentType.executionconstraints, ComponentType.orelse,
        ComponentType.constitutingproperties, ComponentType.modal, ComponentType.constitutivefunction,                      // Constitutive
        ComponentType.constitutedentity, ComponentType.activationconditions, ComponentType.executionconstraints, ComponentType.orelse])
    .range(["#1e74a0", "#4485a9", "#4485a9", "#4485a9", "#1e74a0", "#1e74a0", "#1e74a0", "#377c6e",
        "#4485a9", "#4485a9", "#1e74a0", "#1e74a0", "#1e74a0", "#1e74a0", "#377c6e"])

// Fill color for each node type
export const nodeColorScaler = scaleOrdinal<string, string>()
    .domain([NodeType.regulativestatement, NodeType.constitutivestatement, NodeType.statementjunction,
        NodeType.componentjunction, NodeType.component, NodeType.property, NodeType.propertyjunction])
    .range(["#0c5dba", "#0c5dba", "#5abaa7", "#fcc438", "#3aa6dd", "#bc62bf", "#ed8585"]);

// Slightly darker border color
export const strokeColorScaler = scaleOrdinal<string, string>()
    .domain([NodeType.regulativestatement, NodeType.constitutivestatement, NodeType.statementjunction,
        NodeType.componentjunction, NodeType.component, NodeType.property, NodeType.propertyjunction])
    .range(["#074286", "#074286", "#377c6e", "#c98523", "#1e74a0", "#8d4090", "#b15c5c"]);

// Border color for negated nodes
export const negatedStroke: string = "#c92d2d";

// Other color scales
export const posColorScaler = scaleOrdinal(schemeCategory10)
export const entColorScaler = scaleOrdinal(schemeDark2)
