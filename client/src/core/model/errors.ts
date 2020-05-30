

export enum DataErrorType {
	// Base
	BAS_DEL_DUM				= "Cannot delete a dummy node",
	BAS_DEL_FIX				= "Cannot delete fixed children of Norm and Convention nodes",
	BAS_DEL_LR				= "Cannot delete left or right child of a Component, Subcomponent or Negation node",
	BAS_DEL_ONLY			= "Cannot delete only child of a Junction or Sanction node",
	BAS_DEL_SUB				= "Cannot delete Subcomponent child of a Component node",

	// Component
	CMP_AIM_ADD_NC			= "Component nodes of type Aim cannot have Norm/Convention nodes as children",
	CMP_AIM_ATR_GET_ONLY	= "Component type must be Attributes or Aim in order to get single child",
	CMP_ATR_ADD_NRM			= "Component nodes of type Attributes cannot have Norm nodes as children",
	CMP_CND_ADD				= "Cannot add children to Component nodes of type Conditions",
	CMP_DNT_ADD				= "Component nodes of type Deontic cannot have children",
	CMP_GET_DUM				= "The child of this Component node is a dummy node",
	CMP_GET_UNDEF			= "This Component node has no children",
	CMP_OBJ_ADD				= "Cannot add children to Component nodes of type Object",
	CMP_OBJ_CND_GET_LR		= "Component type must be Object or Conditions in order to get left or right child",
	CMP_OBJ_CND_TXT			= "Component nodes of type Object or Conditions cannot have text content",

	// Convention
	CNV_GET_OBJ_UNDEF		= "This Convention node does not have an Object child",

	// Document
	DOC_TOG_NEG				= "Cannot toggle negation of node types other than Norm, Convention and Junction",
	DOC_TOG_NEG_BAD_PARENT	= "Could not find the child index of the parent that holds the parent's child",

	// Junction
	JUN_ADD_CMP_NO_NC		= "Cannot create a Component node outside of a Norm/Convention subtree",
	JUN_ADD_CMP_SUB			= "Cannot create a Component node as descendant of a Subcomponent node",
	JUN_CMP_MISMATCH		= "The provided component type does not match ancestor's component type",
	JUN_GET_DUM_LEFT		= "Left child of this Junction node is a dummy node",
	JUN_GET_DUM_RIGHT		= "Right child of this Junction node is a dummy node",
	JUN_SUB_MISMATCH		= "The provided subcomponent type does not match ancestor's subcomponent type",

	// Negation
	NEG_GET_DUM				= "The child of this Negation node is a dummy node",

	// Norm
	NRM_GET_OBJ_UNDEF		= "This Norm node does not have an Object child",

	// Sanction
	SAN_GET_DUM_LEFT		= "Left child of this Sanction node is a dummy node",
	SAN_GET_DUM_RIGHT		= "Right child of this Sanction node is a dummy node",

	// Subcomponent
	SUB_ADD_CND				= "Subcomponent nodes of a Conditions subtype cannot have Subcomponent nodes as children",
	SUB_CND_TXT				= "Cannot modify text content of Activation or Execution nodes",
	SUB_GET_DUM				= "The child of this Subcomponent node is a dummy node",
	SUB_GET_UNDEF			= "This Subcomponent node has no children",
	SUB_OBJ_ADD_NRM			= "Subcomponent nodes of an Object subtype cannot have Norm nodes as children"
}

export class DataError extends Error {
	type: DataErrorType;

	constructor(type: DataErrorType) {
		super(type);
		this.name = "DataError";
		this.type = type;
	}
}