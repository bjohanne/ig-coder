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
 * Component types can be categorized as regulative, constitutive,
 * common for regulative & constitutive, and one special type.
 * The special type, Simple Context, is for Component children of
 * component types Activation Conditions and Execution constraints.
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

    // Special
    simplecontext = "Simple Context"
}

/**
 * Return whether the given component type is optional in a Statement.
 * If it's not optional, it's mandatory.
 * @return True if the given component type is optional, false if it's mandatory
 */
export function componentTypeIsOptional(componentType: ComponentType): boolean {
    switch (componentType) {
        case ComponentType.activationconditions:
            return false;
        case ComponentType.executionconstraints:
            return false;
        case ComponentType.orelse:
            return true;
        case ComponentType.attribute:
            return false;
        case ComponentType.directobject:
            return true;
        case ComponentType.indirectobject:
            return true;
        case ComponentType.deontic:
            return true;
        case ComponentType.aim:
            return false;
        case ComponentType.constitutingproperties:
            return true;
        case ComponentType.modal:
            return true;
        case ComponentType.constitutivefunction:
            return false;
        case ComponentType.constitutedentity:
            return false;
        default:            // SimpleContext and undefined - not applicable
            return false;
    }
}

/**
 * Primitive logical operators.
 * Their negated counterparts are not included because
 * when a Junction node is negated, the negation of its operator is understood.
 * The "NONE" type is default and means the junction type has not been set.
 */
export enum JunctionType {
    none = "NONE",
    and  = "AND",
    or   = "OR",
    xor  = "XOR"
}

/**
 * Return a string representing a JunctionType logical operator.
 * @param junctionType The JunctionType string constant to get a string for
 * @return A full-text specification of the logical operator (e.g. conjunction, disjunction)
 */
export function getOperatorString(junctionType: string) : string {
    switch (junctionType) {
        case JunctionType.and:
            return "Conjunction";
        case JunctionType.or:
            return "Disjunction";
        case JunctionType.xor:
            return "Exclusive disjunction";
        default:
            return "";
    }
}

/**
 * Filters JunctionType into an array of its UPPERCASE string constants.
 * Excludes the NONE type.
 * @return An array of the string constants of JunctionType
 */
export function junctionTypeToStringArray(): string[] {
    return Object.values(JunctionType).filter(v => (isNaN(Number(v)) && v !== JunctionType.none));
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

    // Valid node types for root (the constant values don't mean anything)
    regulative = 10,
    constitutive = 11,
    statementjunction = 12,

    // Regulative components
    reg_attribute      = 0,
    reg_deontic        = 1,
    reg_aim            = 2,
    reg_directobject   = 3,
    reg_indirectobject = 4,
    reg_activationconditions = 5,
    reg_executionconstraints = 6,
    reg_orelse         = 7,

    // Constitutive components
    con_constitutedentity       = 0,
    con_modal                   = 1,
    con_constitutivefunction    = 2,
    con_constitutingproperties  = 3,
    con_activationconditions    = 4,
    con_executionconstraints    = 5,
    con_orelse                  = 6
}

/**
 * Get the full, human-readable string of the component in the given position
 * of a Regulative or Constitutive Statement.
 * E.g. regulative 4 is Indirect Object.
 * @param type The statement type of the parent node
 * @param index The children array index of the child node
 * @return The full string associated with the component type in the given position
 */
export function getComponentStringByIndex(type: Arg.regulative | Arg.constitutive, index: number): string {
    if (type === Arg.regulative) {
        switch (index) {
            case Arg.reg_attribute:
                return ComponentType.attribute;
            case Arg.reg_deontic:
                return ComponentType.deontic;
            case Arg.reg_aim:
                return ComponentType.aim;
            case Arg.reg_directobject:
                return ComponentType.directobject;
            case Arg.reg_indirectobject:
                return ComponentType.indirectobject;
            case Arg.reg_activationconditions:
                return ComponentType.activationconditions;
            case Arg.reg_executionconstraints:
                return ComponentType.executionconstraints;
            case Arg.reg_orelse:
                return ComponentType.orelse;
            default:
                return "";
        }
    } else {
        switch (index) {
            case Arg.con_constitutedentity:
                return ComponentType.constitutedentity;
            case Arg.con_modal:
                return ComponentType.modal;
            case Arg.con_constitutivefunction:
                return ComponentType.constitutivefunction;
            case Arg.con_constitutingproperties:
                return ComponentType.constitutingproperties;
            case Arg.con_activationconditions:
                return ComponentType.activationconditions;
            case Arg.con_executionconstraints:
                return ComponentType.executionconstraints;
            case Arg.con_orelse:
                return ComponentType.orelse;
            default:
                return "";
        }
    }
}

/**
 * A representation of the Context Taxonomy used to label Context components.
 * The indentation shows the hierarchy for reference, though this hierarchy is inconsequential
 * for the purposes of labelling Context nodes.
 */
export enum ContextType {
    temporal = 0,
        pointintime = 1,
            t_beginning = 2,
            t_end = 3,
        timeframe = 4,
        frequency = 5,
    spatial = 6,
        location = 7,
            sp_beginning = 8,
            sp_end = 9,
        direction = 10,
        path = 11,
    domain = 12,
    state = 13,
    statetransition = 14,
    event = 15,
    cause_reason = 16,
    outcome_effect = 17,
    proceduralorder = 18,
    method = 19,
        means = 20,
        instrument = 21,
    cause = 22,
    purpose_function = 23
}

/**
 * Filters ContextType into an array of its numerical indices only.
 * @return An array of the numerical indices of ContextType
 */
export function contextTypeToNumArray(): number[] {
    return Object.keys(ContextType).filter(v => !isNaN(Number(v))).map(v => Number(v));
}

/**
 * Get the full, human-readable string for a given ContextType.
 * @param contextType The enum value for the context type to get
 * @return The full string associated with the passed in context type
 */
export function getContextString(contextType: ContextType): string {
    switch (contextType) {
        case ContextType.temporal:
            return "Temporal";
        case ContextType.pointintime:
            return "Point in time";
        case ContextType.t_beginning:
            return "Beginning (temporal)";
        case ContextType.t_end:
            return "End (temporal)";
        case ContextType.timeframe:
            return "Time frame";
        case ContextType.frequency:
            return "Frequency";
        case ContextType.spatial:
            return "Spatial";
        case ContextType.location:
            return "Location";
        case ContextType.sp_beginning:
            return "Beginning (spatial)";
        case ContextType.sp_end:
            return "End (spatial)";
        case ContextType.direction:
            return "Direction";
        case ContextType.path:
            return "Path";
        case ContextType.domain:
            return "Domain";
        case ContextType.state:
            return "State";
        case ContextType.statetransition:
            return "State transition";
        case ContextType.event:
            return "Event";
        case ContextType.cause_reason:
            return "Cause/Reason";
        case ContextType.outcome_effect:
            return "Outcome/Effect";
        case ContextType.proceduralorder:
            return "Procedural order";
        case ContextType.method:
            return "Method";
        case ContextType.means:
            return "Means";
        case ContextType.instrument:
            return "Instrument";
        case ContextType.cause:
            return "Cause";
        case ContextType.purpose_function:
            return "Purpose/Function";
        default:
            return "";
    }
}

/**
 * Get the full, human-readable string for a given ContextType,
 * including dashes (-) that show the hierarchy when printed in a list.
 * @param contextType The enum value for the context type to get
 * @return The full string associated with the passed in context type, with indentation dashes
 */
export function getContextStringAndIndent(contextType: ContextType): string {
    switch (contextType) {
        case ContextType.temporal:
            return "Temporal";
        case ContextType.pointintime:
            return "--Point in time";
        case ContextType.t_beginning:
            return "----Beginning";
        case ContextType.t_end:
            return "----End";
        case ContextType.timeframe:
            return "--Time frame";
        case ContextType.frequency:
            return "--Frequency";
        case ContextType.spatial:
            return "Spatial";
        case ContextType.location:
            return "--Location";
        case ContextType.sp_beginning:
            return "----Beginning";
        case ContextType.sp_end:
            return "----End";
        case ContextType.direction:
            return "--Direction";
        case ContextType.path:
            return "--Path";
        case ContextType.domain:
            return "Domain";
        case ContextType.state:
            return "State";
        case ContextType.statetransition:
            return "State transition";
        case ContextType.event:
            return "Event";
        case ContextType.cause_reason:
            return "Cause/Reason";
        case ContextType.outcome_effect:
            return "Outcome/Effect";
        case ContextType.proceduralorder:
            return "Procedural order";
        case ContextType.method:
            return "Method";
        case ContextType.means:
            return "--Means";
        case ContextType.instrument:
            return "--Instrument";
        case ContextType.cause:
            return "Cause";
        case ContextType.purpose_function:
            return "Purpose/Function";
        default:
            return "";
    }
}

/**
 * Default strings for Context components of statements that have no Activation Conditions or Execution Constraints.
 */
export enum DefaultContext {
    activationconditions = "under all circumstances",
    executionconstraints = "no constraints"
}
