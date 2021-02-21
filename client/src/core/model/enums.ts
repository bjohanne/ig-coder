/**
 * First-level types that all nodes have.
 * If a node doesn't have a node type, it's considered a dummy node.
 * Note: The Statement and Junction types aren't strictly needed,
 * as those classes are base classes not intended to be used directly.
 */
export enum NodeType {
    statement             = "Statement",
    regulativestatement   = "Regulative Statement",
    constitutivestatement = "Constitutive Statement",
    junction              = "Junction",
    statementjunction     = "Statement Junction",
    componentjunction     = "Component Junction",
    component             = "Component",
    property              = "Property",
    propertyjunction      = "Property Junction"
}

/**
 * Second-level types that all Component nodes have.
 * The four "subtypes" are special, as they are the only Component types
 * that can be used as child of another Component node (details in documentation).
 */
export enum ComponentType {
    // Common
    activationconditions = "Activation Conditions",
    executionconstraints = "Execution Constraints",
    orelse     = "Or Else",

    // Regulative
    attribute      = "Attribute",
    directobject   = "Direct Object",
    indirectobject = "Indirect Object",
    deontic        = "Deontic",
    aim            = "Aim",

    // Constitutive
    constitutingproperties = "Constituting Properties",
    modal                  = "Modal",
    constitutivefunction   = "Constitutive Function",
    constitutedentity      = "Constituted Entity",

    // Context subtypes
    context       = "Context",
    nestedcontext = "Nested Context"
}

/**
 * Primitive logical operators.
 * Their negated counterparts are not included because
 * when a Junction node is negated, the negation of its operator is understood.
 */
export enum JunctionType {
    and  = "AND",
    or   = "OR",
    xor  = "XOR"
}

/**
 * Named function arguments used to abstract away array indices for children
 * and to differentiate between the two entry types, for easier usage and improved readability.
 * So you don't have to look up the correct index of a component type.
 */
export enum Arg {
	// Child types
	left  = 0,
	right = 1,
	only  = 0,

    // Valid node types for root
    regulative,
    constitutive,
    statementjunction,

    // Regulative components
    reg_attribute      = 0,
    reg_directobject   = 1,
    reg_indirectobject = 2,
    reg_deontic        = 3,
    reg_aim            = 4,
    reg_activationconditions = 5,
    reg_executionconstraints = 6,
    reg_orelse         = 7,

    // Constitutive components
    con_constitutingproperties  = 0,
    con_modal                   = 1,
    con_constitutivefunction    = 2,
    con_constitutedentity       = 3,
    con_activationconditions    = 4,
    con_executionconstraints    = 5,
    con_orelse                  = 6
}

/**
 * A representation of the Circumstances Taxonomy used to label Context components.
 * The indentation shows the hierarchy for reference, though this hierarchy is inconsequential
 * for the purposes of labelling Context nodes.
 */
export enum ContextType {
    temporal = "tmp",
        pointintime = "tim",
            t_beginning = "beg",
            t_end = "end",
        timeframe = "tfr",
        frequency = "frq",
    spatial = "spt",
        location = "loc",
            sp_beginning = "beg",
            sp_end = "end",
        direction = "dir",
        path = "pth",
    domain = "dom",
    state = "ste",
    statetransition = "tra",
    event = "evt",
    cause_reason = "cau",
    outcome_effect = "eff",
    proceduralorder = "prc",
    method = "met",
        means = "mns",
        instrument = "ins",
    cause = "cau",
    purpose_function = "pur"
}
