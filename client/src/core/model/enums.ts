/**
 * First-level types that all nodes have.
 * If a node doesn't have a node type, it's considered a dummy node.
 * Note: The Statement and Junction types aren't strictly needed,
 * as those classes are base classes not intended to be used directly.
 */
import {Simulate} from "react-dom/test-utils";
import contextMenu = Simulate.contextMenu;

export enum NodeType {
    statement             = "Statement",
    regulativestatement   = "Regulative Statement",
    constitutivestatement = "Constitutive Statement",
    junction              = "Junction",
    statementjunction     = "Statement Junction",
    componentjunction     = "Component Junction",
    component             = "Component"
}

/**
 * Second-level types that all Component nodes have.
 * The four "subtypes" are special, as they are the only Component types
 * that can be used as child of another Component node (details in documentation).
 */
export enum ComponentType {
    // Common
    deontic    = "Deontic",
    activationconditions = "Activation Conditions",
    executionconstraints = "Execution Constraints",
    orelse     = "Or Else",

    // Regulative
    attribute  = "Attribute",
    object     = "Object",
    aim        = "Aim",

    // Constitutive
    constitutingproperties = "Constituting Properties",
    constitutivefunction   = "Constitutive Function",
    constitutedentity      = "Constituted Entity",

    // Object subtypes
    directobject        = "Direct Object",
    indirectobject      = "Indirect Object",

    // Context subtypes
    activationcondition = "Activation Condition",
    executionconstraint = "Execution Constraint"
}

/**
 * Primitive logical operators.
 * Their negated counterparts are not included because
 * when a Junction node is negated, the negation of its operator is implied.
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
    reg_attribute   = 0,
    reg_object      = 1,
    reg_deontic     = 2,
    reg_aim         = 3,
    reg_activationconditions = 4,
    reg_executionconstraints = 5,
    reg_orelse      = 6,

    // Constitutive components
    con_constitutingproperties  = 0,
    con_deontic                 = 1,
    con_constitutivefunction    = 2,
    con_constitutedentity       = 3,
    con_activationconditions    = 4,
    con_executionconstraints    = 5,
    con_orelse                  = 6
}

class ContextComponent {
    code: string    // Abbreviation
}

class CTemporal extends ContextComponent { code = "tmp" }
    class CPointInTime extends CTemporal { code = "tim" }
        class CTemporalBeginning extends CPointInTime { code = "beg" }
        class CTemporalEnd extends CPointInTime { code = "end" }
    class CTimeframe extends CTemporal { code = "tfr" }
    class CFrequency extends CTemporal { code = "frq" }
class CSpatial extends ContextComponent { code = "spt" }
    class CLocation extends CSpatial { code = "loc" }
        class CSpatialBeginning extends CLocation { code = "beg" }
        class CSpatialEnd extends CLocation { code = "end" }
    class CDirection extends CSpatial { code = "dir" }
    class CPath extends CSpatial { code = "pth" }
class CState extends ContextComponent { code = "ste" }
    class CStateBeginning extends CState { code = "beg" }
    class CStateEnd extends CState { code = "end" }
class CStateTransition extends ContextComponent { code = "tra" }
class CProceduralOrder extends ContextComponent { code = "prc" }
class CConcept extends ContextComponent { code = "cpt" }
class CMethod extends ContextComponent { code = "met" }
    class CMeans extends CMethod { code = "mns" }
    class CInstrument extends CMethod { code = "ins" }
class CCause extends ContextComponent { code = "cau" }
class CPurpose extends ContextComponent { code = "pur" }
class CObservedEffect extends ContextComponent { code = "eff" }

/**
 * A representation of the Circumstances Taxonomy used to label Context components.
 * Note that this is an object, not an enumerator.
 */
export const ContextType = {
    temporal: {
        pointintime: {
            beginning: "beginning",
            end: "end"
        },
        timeframe: "tfr",
        frequency: "frq"
    },
    spatial: {
        location: {
            beginning: "beginning",
            end: "end"
        },
        direction: "dir",
        path: "pth"
    },
    state: {
        beginning: "beginning",
        end: "end"
    },
    statetransition: "tra",
    proceduralorder: "prc",
    concept: "cpt",
    method: {
        means: "means",
        instrument: "instrument"
    },
    cause: "cau",
    purpose: "pur",
    observedeffect: "eff"
}
