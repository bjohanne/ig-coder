import { IComponent } from "./interfaces"
import { ComponentType } from "./enums";

/**
 * An ABDICO component that can optionally have text content.
 * If it has text content, it can optionally also have prefix and suffix.
 * Main holds the text that most narrowly fits the component type.
 * Prefix and suffix hold the rest of the clause that belongs to the component,
 * like prepositions. Example: "against a certified operation", an Object.
 * "a certified operation" is the content; "against" is the prefix.
 * The component is empty if its content is undefined.
 */
 export class Component implements IComponent {
    content!: {
        main: string,
        prefix?: string,
        suffix?: string
    };

    /**
     * Create a new Component that holds text content.
     *
     * @param content The text that most narrowly fits the component
     * @param prefix (Optional) Excess text that goes before the main content
     * @param suffix (Optional) Excess text that goes after the main content
     */
    constructor(content: string, prefix?: string, suffix?: string) {
        this.content = {
            main: content,
            prefix,
            suffix
        }
    }
 }
