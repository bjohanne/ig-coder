import {ComponentType} from "./enums";

/**
 * A mapping of error codes to full error messages, for errors specific to the IG 2.0 data model.
 */
export enum DataErrorType {
	// Base
	BAS_BAD_NODETYPE		= "This Node has an invalid node type (probably base Statement or Junction)",

	// Component
	CMP_AC_TXT				= "Component nodes of type Activation Conditions cannot have text content",
	CMP_ADD_CMP 			= "Cannot create the specified Component child of this Component node",
	CMP_ADD_CMPJUN			= "This Component type cannot have a ComponentJunction child",
	CMP_ADD_PRP 			= "This Component type cannot have a Property child",
	CMP_ADD_PRPJUN 			= "This Component type cannot have a PropertyJunction child",
	CMP_ADD_STMT			= "This Component type cannot have a Statement child",
	CMP_ADD_STMTJUN			= "This Component type cannot have a StatementJunction child",
	CMP_BAD_CHILD_IDX		= "Component child index out of bounds",
	CMP_BAD_PARENT			= "Parent Component node violates rules regarding Component type and number of children",
	CMP_CTXT_ADD_DEL		= "Component nodes of type SimpleContext cannot have children",
	CMP_CTXT_TYPE			= "Component type must be SimpleContext to set and unset context type",
	CMP_DNT_ADD_DEL			= "Component nodes of type Deontic cannot have children",
	CMP_EC_TXT 				= "Component nodes of type Execution Constraints cannot have text content",
	CMP_GET_TXT_UNDEF		= "This Component node's Text object is undefined",
	CMP_HAS_CHLD 			= "This Component node already has one or more children",
	CMP_HAS_CHLD_NO_PRP		= "This Component node already has a child not of type Property or PropertyJunction",
	CMP_MODAL_ADD_DEL		= "Component nodes of type Modal cannot have children",
	CMP_NO_CHLD 			= "This Component node has no children",
	CMP_TYPE_MISMATCH		= "Provided child component type does not match ancestor's component type",

	// Document
	DOC_BAD_ENTRY_IDX		= "Document's entry index out of bounds",
	DOC_NO_ENTRIES			= "This Document has no entries",

	// Entry
	ENT_NO_ROOT 			= "This Entry has no root",

	// Junction
	JUN_BAD_CHILD_IDX 		= "Junction child index out of bounds",
	JUN_DUM_LEFT			= "Left child of this Junction node is a dummy node",
	JUN_DUM_RIGHT			= "Right child of this Junction node is a dummy node",
	JUN_UNDEF_LEFT			= "Left child of this Junction node is undefined",
	JUN_UNDEF_RIGHT			= "Right child of this Junction node is undefined",

	// RegulativeStatement
	REG_HAS_DIROBJ			= "This RegulativeStatement node already has a DirectObject child",
	REG_HAS_INDIROBJ		= "This RegulativeStatement node already has an IndirectObject child",
	REG_HAS_DNT				= "This RegulativeStatement node already has a Deontic child",
	REG_HAS_ORELSE			= "This RegulativeStatement node already has an Or Else child",
	REG_NO_DIROBJ			= "This RegulativeStatement node does not have a DirectObject child",
	REG_NO_INDIROBJ			= "This RegulativeStatement node does not have an IndirectObject child",
	REG_NO_DNT				= "This RegulativeStatement node does not have a Deontic child",
	REG_NO_ORELSE			= "This RegulativeStatement node does not have an Or Else child",

	// ConstitutiveStatement
	CON_HAS_CONPROP			= "This ConstitutiveStatement node already has a ConstitutingProperties child",
	CON_HAS_MODAL			= "This ConstitutiveStatement node already has a Modal child",
	CON_HAS_ORELSE			= "This ConstitutiveStatement node already has an Or Else child",
	CON_NO_CONPROP			= "This ConstitutiveStatement node does not have a ConstitutingProperties child",
	CON_NO_MODAL			= "This ConstitutiveStatement node does not have a Modal child",
	CON_NO_ORELSE			= "This ConstitutiveStatement node does not have an Or Else child",

	// Property
	PRP_HAS_CHLD			= "This Property node already has a child",
	PRP_HAS_STMT_CHLD		= "This Property node already has a Statement child",
	PRP_HAS_STMTJUN_CHLD	= "This Property node already has a StatementJunction child",
	PRP_GET_TXT_UNDEF 		= "This Property node's Primitive is undefined",
	PRP_NO_CHLD				= "This Property node has no children",
	PRP_TOO_MANY_CHLD 		= "This Property node has more than one child"
}

/**
 * An error specific to the IG 2.0 data model.
 */
export class DataError extends Error {
	name = "DataError";

	/**
	 * @param type The type of error, specified by the enum DataErrorType which maps error codes to full error messages
	 * @param id The ID of the Node, Document or Entry on which the error occurred
	 * @param componentType (Optional) If the error involves a component type, it is given here
	 */
	constructor(public type: DataErrorType, public id: number, public componentType?: ComponentType) {
		super(type);
		this.type = type;
		this.id = id;
		if (componentType) {
			this.componentType = componentType;
		}
	}
}