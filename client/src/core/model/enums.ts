export enum NodeType {
    norm         = "Norm",
    convention   = "Convention",
    junction     = "Junction",
    sanction     = "Sanction",
    negation     = "Negation",
    component    = "Component",
    subcomponent = "Subcomponent"
}

export enum JunctionType {
    and  = "AND",
    or   = "OR",
    xor  = "XOR"
}

export enum ComponentType {
    attributes = "Attributes",
    object     = "Object",
    deontic    = "Deontic",
    aim        = "Aim",
    conditions = "Conditions",
}

export enum SubcomponentType {
    // Object subtypes
    direct     = "Direct",
    indirect   = "Indirect",
    // Conditions subtypes
    activation = "Activation",
    execution  = "Execution"
}

/**
 Named function arguments for abstracting away array indices for children
 and differentiating entry types, which ease usage and improve readability.
 */
export enum Arg {
	// Child types
	left,
	right,
	only,
	attributes,
	object,
	deontic,
	aim,
	conditions,
	// Entry types
	norm,
	convention
}
