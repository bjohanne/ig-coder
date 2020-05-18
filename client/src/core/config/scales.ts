import { NodeType, ComponentType } from "../model/enums";
import { scaleOrdinal, schemeCategory10, schemeDark2 } from "d3";

export const nodeColorScaler = scaleOrdinal()
.domain([NodeType.component, NodeType.composite, NodeType.junction, NodeType.negation, NodeType.norm, NodeType.sanction, NodeType.subcomponent])
.range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598", "#FFFFBF", "#FEE08B"]);

export const componentColorScaler = scaleOrdinal()
.domain([ComponentType.aim, ComponentType.attributes, ComponentType.conditions, ComponentType.deontic, ComponentType.object])
.range(["#f45905", "#010038", "#f35588", "#7c0a02", "#91b029"])

export const posColorScaler = scaleOrdinal(schemeCategory10)

export const entColorScaler = scaleOrdinal(schemeDark2)