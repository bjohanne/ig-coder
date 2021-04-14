import {ComponentType} from "./enums";

/**
 * Returns whether two component types match.
 * By default they only match if they are the same, but in the special case of Activation Conditions/Execution Constraints,
 * such nodes can have children of a certain Component type (SimpleContext).
 *
 * @param parent The component type of the parent node
 * @param child The component type of the child node
 */
export function matchComponentTypes(parent: ComponentType, child: ComponentType) : boolean {
    if ([ComponentType.activationconditions, ComponentType.executionconstraints]
            .includes(parent) && child === ComponentType.simplecontext) {
        return true;
    } else {
        return (parent === child);
    }
}
