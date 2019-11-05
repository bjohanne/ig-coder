import {IComponent} from "./interfaces"
import {ComponentType} from "./enums";

/**
 * IComponent implementations
 */
export class Component implements IComponent {
    componentType!: ComponentType;
    content!: string;
    prefix!: string;
    suffix!: string;

    /**
     * Create a new component.
     * content, prefix and suffix are optional but if content is not provided,
     * then prefix and suffix will be set to undefined.
     * @param type the component type: Attributes, Object, Deontic, Aim or Conditions
     * @param content the text that most narrowly fits the components
     * @param prefix any excess text that goes before the main content
     * @param suffix any excess text that goes after the main content
     */
    public createComponent(type: ComponentType, content?: string, prefix?: string, suffix?: string) {
        if (!content) {
            prefix = undefined;
            suffix = undefined;
        }
        return Object.assign(new Component(), {
            type,
            content,
            prefix,
            suffix
        });
    }
}
