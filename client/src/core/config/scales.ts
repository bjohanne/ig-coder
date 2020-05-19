import { NodeType, ComponentType } from "../model/enums";
import { scaleOrdinal, schemeCategory10, schemeDark2 } from "d3";

export const componentColorScaler = scaleOrdinal()
.domain([ComponentType.aim, ComponentType.attributes, ComponentType.conditions, ComponentType.deontic, ComponentType.object])
.range(["#f45905", "#010038", "#f35588", "#7c0a02", "#91b029"])

// Color for each node type
export const nodeColorScaler = scaleOrdinal()
    .domain([NodeType.norm, NodeType.convention, NodeType.junction, NodeType.negation, NodeType.sanction, NodeType.component, NodeType.subcomponent])
    .range(["#7ab648", "#7ab648", "#fcc438", "#c92d39", "#6a4100", "#99d2f2", "#0c7cba"]);

// Slightly darker border color
export const strokeColorScaler = scaleOrdinal()
    .domain([NodeType.norm, NodeType.convention, NodeType.junction, NodeType.negation, NodeType.sanction, NodeType.component, NodeType.subcomponent])
    .range(["#46692a", "#46692a", "#ac8219", "#7f151e", "#2f1901", "#4286ae", "#003f61"]);

export const posColorScaler = scaleOrdinal(schemeCategory10)

export const entColorScaler = scaleOrdinal(schemeDark2)
