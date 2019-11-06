import { IComponent } from "./interfaces"
import { ComponentType } from "./enums";

/**
 * An ABDICO component that holds text content.
 * It can optionally have prefix and suffix.
 * Main holds the text that most narrowly fits the component type.
 * Prefix and suffix hold the rest of the clause that belongs to the component,
 * like prepositions. Example: "against a certified operation", an Object.
 * "a certified operation" is the content; "against" is the prefix.
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

    /**
     * Modify each part of the component individually.
     * Only the provided parameters are changed.
     */
    modify(content?: string, prefix?: string, suffix?: string) {
        if (content) {
            this.content.main = content;
        }
        if (prefix) {
            this.content.prefix = prefix;
        }
        if (suffix) {
            this.content.suffix = suffix;
        }
    }
 }
