import {ITextContent} from "./interfaces"

/**
 * This class holds the text content of institutional components and properties.
 * The text content can optionally include prefix and suffix in addition to the main string.
 * Main holds the text that most narrowly fits the component or property.
 * Prefix and suffix hold the rest of the clause that belongs to the component, like prepositions.
 * Example: "against a certified operation", an object.
 * "a certified operation" is the content; "against" is the prefix.
 *
 * When content is undefined, the text content is considered to be unset and vice versa.
 * Use that to differentiate between intentionally empty and not yet set content.
 */
 export class TextContent implements ITextContent {
	/* The text that most narrowly fits the component/property, taken directly from the raw statement */
	main?: string;
	/* Text from the raw statement that precedes the main part, e.g. prepositions and articles */
	prefix?: string;
	/* Text from the raw statement that succeeds the main part */
	suffix?: string;
	/* If the raw text is tacit/implicit, this is an explicit specification */
	explicit?: string;
	/* A rephrased version of the text in the main field */
	rephrased?: string;

    /**
	 * Create a new TextContent object that holds text content.
	 * Only sets those fields that are provided. The existence of the main field determines whether the
	 *  text content is considered set.
	 * Any undefined arguments will result in the corresponding field undefined.
	 * You can pass an empty string to any field.
	 *
	 * @param main (Optional) The text that most narrowly fits the component/property
	 * @param prefix (Optional) Text from the raw statement that precedes the main part
	 * @param suffix (Optional) Text from the raw statement that succeeds the main part
	 * @param explicit (Optional) If the raw text is tacit/implicit, this is an explicit specification
	 * @param rephrased (Optional) A rephrased version of the text in the main field
	 */
    constructor(main?: string, prefix?: string, suffix?: string, explicit?: string, rephrased?: string) {
    	this.set(main, prefix, suffix, explicit, rephrased);
    }

	/**
	 * Static factory method that creates a new TextContent object from the passed in data.
	 * Convenience for when you have long arguments, but also used for rebuilding from existing data.
	 * @param data An object of type ITextContent
	 */
	static fromData(data: ITextContent) : TextContent {
		return new this(data.main, data.prefix, data.suffix, data.explicit, data.rephrased);
    }

	/**
	 * Set each part of the TextContent individually.
	 * Only the provided parameters are changed, but you can pass an empty string to set to that.
	 * If an argument is undefined, the corresponding string is unchanged.
	 *
	 * @param main (Optional) The text that most narrowly fits the component/property
	 * @param prefix (Optional) Text from the raw statement that precedes the main part
	 * @param suffix (Optional) Text from the raw statement that succeeds the main part
	 * @param explicit (Optional) If the raw text is tacit/implicit, this is an explicit specification
	 * @param rephrased (Optional) A rephrased version of the text in the main field
	 */
	set(main?: string, prefix?: string, suffix?: string, explicit?: string, rephrased?: string) : void {
		// All parameters are optional - set only those that are defined. These checks allow setting to an empty string.
		if (typeof main !== "undefined") {
			this.main = main;
		}
		if (typeof prefix !== "undefined") {
			this.prefix = prefix;
		}
		if (typeof suffix !== "undefined") {
			this.suffix = suffix;
		}
		if (typeof explicit !== "undefined") {
			this.explicit = explicit;
		}
		if (typeof rephrased !== "undefined") {
			this.rephrased = rephrased;
		}
		// Note that we can set fields even if main is undefined. This is necessary for fromData() rebuilding, which
		// does not need the tree to be strictly valid.
	}

	/**
	 * Set all fields to undefined, reverting the text content to a "not yet coded" state.
	 */
	unset() : void {
		this.main = undefined;
		this.prefix = undefined;
		this.suffix = undefined;
		this.explicit = undefined;
		this.rephrased = undefined;
	}

	/**
	 * Returns whether the text content has been set (which is determined by whether the main field is defined).
	 * This function will return true if main is an empty string, which is considered intentionally empty.
	 * NB: This function ignores all other fields than main.
	 */
	isSet() : Boolean {
		return (typeof this.main !== undefined);
	}

	/**
	 * Returns true if all text fields are empty/undefined OR
	 *  the main field is defined and has one of the default values for Junction text content,
	 *  which are ["and", "or"]. In that case, non-main fields are ignored.
	 */
	isEmptyOrJunctionDefault() : Boolean {
		return (
			(!this.main && !this.prefix && !this.suffix && !this.explicit && !this.rephrased) ||
			(typeof this.main !== undefined && ["and", "or"].includes(this.main))
		)
	}

	/**
	 * Concatenates the text content's prefix, main and suffix and returns the resulting string.
	 * The resulting string will have exactly one space between each present component and no superfluous spaces.
	 * @return A string concatenated from the present components out of prefix, main and suffix
	 */
	getString() : string {
		let str: string = "";

		if (this.prefix) {
			str += this.prefix;
			if (this.main || this.suffix) {
				str += " ";
			}
		}

		if (this.main) {
			str += this.main;

			if (this.suffix) {
				str += " ";
			}
		}

		if (this.suffix) {
			str += this.suffix;
		}

		return str;
	}
}

