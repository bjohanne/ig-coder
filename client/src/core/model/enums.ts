export enum NodeType {
    norm         = "Norm",
    convention   = "Convention",
    junction     = "Junction",
    sanction     = "Sanction",
    negation     = "Negation",
    component    = "Component",
    subcomponent = "Subcomponent"
}

// Basic and negated logical operators for junctions
export enum JunctionType {
    and  = "AND",
    or   = "OR",
    xor  = "XOR",
    nand = "NAND",
    nor  = "NOR",
    xnor = "XNOR"
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
