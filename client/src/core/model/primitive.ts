import { IPrimitive } from "./interfaces"

/**
 * This class holds the text content of institutional components and properties.
 * Components and properties with text content can be considered primitives, hence the name.
 * The text content can optionally include prefix and suffix in addition to the main string.
 * Main holds the text that most narrowly fits the component or property.
 * Prefix and suffix hold the rest of the clause that belongs to the component, like prepositions.
 * Example: "against a certified operation", an object.
 * "a certified operation" is the content; "against" is the prefix.
 *
 * When content is undefined, the Primitive's text content is considered to be unset and vice versa.
 * Use that to differentiate between intentionally empty and not yet set content.
 */
 export class Primitive implements IPrimitive {
    content?: {
        main: string,
        prefix: string,
        suffix: string
    };

    /**
	 * Create a new Component that holds text content.
	 * If no arguments are provided, content will be undefined.
	 * Otherwise, sets the content strings to the passed in arguments or an empty string.
	 *
	 * @param main (Optional) The text that most narrowly fits the component
	 * @param prefix (Optional) Excess text that goes before the main content
	 * @param suffix (Optional) Excess text that goes after the main content
	 */
    constructor(main?: string, prefix?: string, suffix?: string) {
		if (main || prefix || suffix) {	// At least one argument provided
			this.content = {
				main: (main) ? main : "",
				prefix: (prefix) ? prefix : "",
				suffix: (suffix) ? suffix : ""
			}
		}
    }

	/**
	 * Static factory method that takes an object of the IPrimitive type
	 * and creates a new Component object. Convenience for when you have long arguments.
	 * If content is unset, returns undefined.
	 * @param data An object of type IPrimitive
	 */
	static fromData(data: IPrimitive) {
		if (!data.content) {
			return undefined;
		}
		return new this(data.content.main, data.content.prefix, data.content.suffix);
    }

    /**
	 * Set each part of the component individually.
	 * Only the provided parameters are changed.
	 * If no arguments are provided, the content strings will not be changed.
	 * If content is undefined, defines it.
	 *
	 * @param main (Optional) The text that most narrowly fits the component
	 * @param prefix (Optional) Excess text that goes before the main content
	 * @param suffix (Optional) Excess text that goes after the main content
	 */
    set(main?: string, prefix?: string, suffix?: string) {
		if (!this.content) {
			this.content = {
				main: (main) ? main : "",
				prefix: (prefix) ? prefix : "",
				suffix: (suffix) ? suffix : ""
			}
		} else {
			if (main) {
				this.content.main = main;
			}
			if (prefix) {
				this.content.prefix = prefix;
			}
			if (suffix) {
				this.content.suffix = suffix;
			}
		}
    }

	/**
	 * Set this Component's content to undefined if it isn't already.
	 */
	unset() {
		if (this.content) {
			this.content = undefined;
		}
	}

	/**
	 * Concatenates the Component's prefix, main and suffix and returns the resulting string.
	 * If main is an empty string, the resulting string will have no superfluous spaces.
	 */
	getString() : string {
		let str: string = "";

		if (this.content) {
			if (this.content.prefix) {
				str += this.content.prefix;
				if (this.content.main) {
					str += " ";
				}
			}

			str += this.content.main;

			if (this.content.suffix) {
				if (this.content.main) {
					str += " ";
				}
				str += this.content.suffix;
			}
		}
		return str;
	}
}

