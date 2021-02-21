import {ComponentType} from "./enums";

/**
 * Returns whether two component types match.
 * By default they only match if they are the same, but in the special case of Activation Conditions/Execution Constraints,
 * such nodes can have children that have a specific subset of Component types.
 *
 * @param parent The component type of the parent node
 * @param child The component type of the child node
 */
export function matchComponentTypes(parent: ComponentType, child: ComponentType) : boolean {
    if ([ComponentType.activationconditions, ComponentType.executionconstraints]
            .includes(parent) && child === ComponentType.context) {
        return true;
    } else if (parent === ComponentType.context && child === ComponentType.nestedcontext) {
        return true;
    } else {
        return (parent === child);
    }
}
