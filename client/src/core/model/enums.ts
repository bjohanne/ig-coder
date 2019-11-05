export enum NodeType {
    composite = "Composite",
    nestedComposite = "Nested Composite",
    junction = "Junction",
    sanction = "Sanction",
    negation = "Negation",
    component = "Component",
    subcomponent = "Subcomponent"
}

// Basic and negated logical operators for junctions
export enum JunctionType {
    and = "AND",
    or = "OR",
    xor = "XOR",
    nand = "NAND",
    nor = "NOR",
    xnor = "XNOR"
}

export enum ComponentType {
    attributes = "Attributes",
    object = "Object",
    deontic = "Deontic",
    aim = "Aim",
    conditions = "Conditions",
}

export enum ObjectSubtype {
    direct = "Direct",
    indirect = "Indirect"
}

export enum ConditionSubtype {
    activation = "Activation",
    execution = "Execution"
}
