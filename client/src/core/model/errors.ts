export enum DataErrorType {
	// Component
	CMP_ADD_CMPJUN			= "This Component type cannot have a ComponentJunction child",
	CMP_ADD_STMT			= "This Component type cannot have a Statement child",
	CMP_ADD_STMTJUN			= "This Component type cannot have a StatementJunction child",
	CMP_BAD_CHILD_IDX		= "Component child index out of bounds",
	CMP_BAD_PARENT			= "Parent Component node violates rules regarding Component type and number of children",
	CMP_CTXT_ADD_DEL		= "Component nodes of type ActivationCondition and ExecutionConstraint cannot have children",
	CMP_DNT_ADD_DEL			= "Component nodes of type Deontic cannot have children",
	CMP_GET_DUM				= "The child of this Component node is a dummy node",
	CMP_GET_TXT_UNDEF		= "This Component node has no Component object",
	CMP_OBJ_ADD_NO_POS		= "Position not provided for child of Component node of type Object",
	CMP_OBJ_SUB_ADD_DEL		= "Component nodes of type DirectObject and IndirectObject cannot have children",
	CMP_OBJ_TXT				= "Component nodes of type Object cannot have text content",
	CMP_TYPE_MISMATCH		= "Provided child component type does not match ancestor's component type",

	// Document
	DOC_BAD_ENTRY_IDX		= "Entries array index out of bounds",
	DOC_NO_ENTRIES			= "This Document has no entries",

	// Junction
	JUN_DEL_BAD_IDX			= "Junction child index out of bounds",
	JUN_GET_DUM_LEFT		= "Left child of this Junction node is a dummy node",
	JUN_GET_DUM_RIGHT		= "Right child of this Junction node is a dummy node",
	JUN_GET_UNDEF_LEFT		= "Left child of this Junction node is undefined",
	JUN_GET_UNDEF_RIGHT		= "Right child of this Junction node is undefined",

	// RegulativeStatement
	REG_NO_OBJ				= "This RegulativeStatement node does not have an Object child",
	REG_NO_DNT				= "This RegulativeStatement node does not have a Deontic child",
	REG_NO_ORELSE			= "This RegulativeStatement node does not have an Or Else child",

	// ConstitutiveStatement
	CON_NO_CONPROP			= "This ConstitutiveStatement node does not have a ConstitutingProperties child",
	CON_NO_DNT				= "This ConstitutiveStatement node does not have a Deontic child",
	CON_NO_ORELSE			= "This ConstitutiveStatement node does not have an Or Else child",}

export class DataError extends Error {
	name = "DataError";
	type: DataErrorType;

	constructor(type: DataErrorType) {
		super(type);
		this.type = type;
	}
}