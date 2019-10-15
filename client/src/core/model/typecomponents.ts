import { IComponent } from "./interfaces"
import { ComponentType } from "./enums";

/**
 * IComponent implementations
 */
 export class Component implements IComponent {
    componentType!: ComponentType;
    content!: string;
    prefix!: string;
    suffix!: string;

    /**
     *
     * @param type the component type: Attributes, Object, Deontic, Aim or Conditions
     * @param properties descriptive characteristics of the component
     * @param content text
     */
    public static createComponent(type: ComponentType, properties: IProperty[], content: string) {
        return Object.assign(new Component(), {
            type,
            properties,
            content
        });
    }
 }
