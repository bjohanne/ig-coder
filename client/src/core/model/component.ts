import { IComponent } from "./interfaces"

/**
 * This class holds the text content of institutional components.
 * TODO: IG Extended properties go here.
 * It can optionally have prefix and suffix.
 * Main holds the text that most narrowly fits the component type.
 * Prefix and suffix hold the rest of the clause that belongs to the component,
 * like prepositions. Example: "against a certified operation", an Object.
 * "a certified operation" is the content; "against" is the prefix.
 *
 * When content is undefined, the Component is considered to be unset, otherwise set.
 * Use that to differentiate between intentionally empty and not yet set content.
 */
 export class Component implements IComponent {
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
	 * Static factory method that takes an object of the IComponent type
	 * and creates a new Component object. Convenience for when you have long arguments.
	 * If content is undefined, returns undefined.
	 * @param data An object of type IComponent
	 */
	static fromData(data: IComponent) {
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
	 * Concatenates the Component's prefix, main and suffix.
	 * If main is an empty string, the resulting string will have no superfluous spaces.
	 */
	string() : string {
		let ret: string = "";

		if (this.content) {
			if (this.content.prefix) {
				ret += this.content.prefix;
				if (this.content.main) {
					ret += " ";
				}
			}

			ret += this.content.main;

			if (this.content.suffix) {
				if (this.content.main) {
					ret += " ";
				}
				ret += this.content.suffix;
			}
		}
		return ret;
	}
}

