export enum NodeType {
    norm         = "Norm",
    convention   = "Convention",
    junction     = "Junction",
    sanction     = "Sanction",
    negation     = "Negation",
    component    = "Component",
    subcomponent = "Subcomponent",
    composite    = "Composite"
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
 * What type of subtree or context a node is part of, if any.
 * Entry subtrees have a Norm or Convention node as root,
 * Sanction ones a Sanction node.
 */
export enum SubtreeType {
	entry = "Entry",
	sanction = "Sanction"
}

/**
 Named function arguments used to abstract away array indices for children
 and to differentiate between the two entry types, for easier usage and improved readability.
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
