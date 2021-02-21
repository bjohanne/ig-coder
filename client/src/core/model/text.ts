import { IText } from "./interfaces"

/**
 * This class holds the text content of institutional components and properties.
 * The text content can optionally include prefix and suffix in addition to the main string.
 * Main holds the text that most narrowly fits the component or property.
 * Prefix and suffix hold the rest of the clause that belongs to the component, like prepositions.
 * Example: "against a certified operation", an object.
 * "a certified operation" is the content; "against" is the prefix.
 *
 * When content is undefined, the Text's content is considered to be unset and vice versa.
 * Use that to differentiate between intentionally empty and not yet set content.
 */
 export class Text implements IText {
 	/* Text content with a main part and optionally prefix and suffix */
    content?: {
        main: string,
        prefix: string,
        suffix: string
    };
    /* (Optional) Rewritten, explicit version of the original text */
    explicit?: string;

    /**
	 * Create a new Text object that holds text content.
	 * If no arguments are provided, content will be undefined, meaning the Text's content is considered unset.
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
	 * Static factory method that takes an object of the IText type
	 * and creates a new Text object. Convenience for when you have long arguments.
	 * If content is unset, returns undefined.
	 * @param data An object of type IText
	 */
	static fromData(data: IText) {
		if (!data.content) {
			return undefined;
		}
		return new this(data.content.main, data.content.prefix, data.content.suffix);
    }

	/**
	 * Returns whether this Text's content has been set.
	 */
	isSet() : Boolean {
		return (typeof this.content !== undefined);
	}

    /**
	 * Set each part of the component/property individually.
	 * Only the provided parameters are changed.
	 * If no arguments are provided, the content strings will not be changed.
	 * If content is undefined, defines it.
	 *
	 * @param main (Optional) The text that most narrowly fits the component/property
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
	 * Set this Text's content to undefined, reverting it to a "not yet coded" state.
	 */
	unset() : void {
		this.content = undefined;
	}

	/**
	 * Set this Text's explicit field to the passed in string.
	 *
	 * @param explicit A version of the original text rewritten in an explicit form
	 */
	setExplicit(explicit: string) : void {
		this.explicit = explicit;
	}

	/**
	 * Set this Text's explicit field to undefined.
	 */
	unsetExplicit() : void {
		this.explicit = undefined;
	}

	/**
	 * Concatenates the Text content's prefix, main and suffix and returns the resulting string.
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

