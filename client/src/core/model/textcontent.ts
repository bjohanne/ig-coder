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
	main: string;
	/* Text from the raw statement that precedes the main part, e.g. prepositions and articles */
	prefix: string;
	/* Text from the raw statement that succeeds the main part */
	suffix: string;
	/* An explicit specification and/or rephrasing of the main part */
	inferredOrRephrased: string;

    /**
	 * Create a new TextContent object that holds text content.
	 * Only sets those fields that are provided.
	 * Any undefined arguments will result in the corresponding field undefined.
	 * You can pass an empty string to any field.
	 *
	 * @param main (Optional) The text that most narrowly fits the component/property
	 * @param prefix (Optional) Text from the raw statement that precedes the main part
	 * @param suffix (Optional) Text from the raw statement that succeeds the main part
	 * @param inferredOrRephrased (Optional) An explicit specification and/or rephrasing of the main part
	 */
    constructor(main?: string, prefix?: string, suffix?: string, inferredOrRephrased?: string) {
		this.main = (typeof main !== "undefined") ? main : "";
		this.prefix = (typeof prefix !== "undefined") ? prefix : "";
		this.suffix = (typeof suffix !== "undefined") ? suffix : "";
		this.inferredOrRephrased = (typeof inferredOrRephrased !== "undefined") ? inferredOrRephrased : "";
    }

	/**
	 * Static factory method that creates a new TextContent object from the passed in data.
	 * Convenience for when you have long arguments, but also used for rebuilding from existing data.
	 * @param data An object of type ITextContent
	 */
	static fromData(data: ITextContent) : TextContent {
		return new this(data.main, data.prefix, data.suffix, data.inferredOrRephrased);
    }

	/**
	 * Conveniently set text content with a single parameter.
	 * NB: Will overwrite all fields.
	 * @param data An object of type ITextContent
	 */
	setFromData(data: ITextContent) : void {
		this.set(data.main, data.prefix, data.suffix, data.inferredOrRephrased);
	}

	/**
	 * Set each part of the TextContent individually.
	 * Only sets those fields that are provided. Pass undefined to ignore a field, pass a string to set
	 * the field to that string, including an empty string.
	 *
	 * @param main (Optional) The text that most narrowly fits the component/property
	 * @param prefix (Optional) Text from the raw statement that precedes the main part
	 * @param suffix (Optional) Text from the raw statement that succeeds the main part
	 * @param inferredOrRephrased (Optional) An explicit specification and/or rephrasing of the main part
	 */
	set(main?: string, prefix?: string, suffix?: string, inferredOrRephrased?: string) : void {
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
		if (typeof inferredOrRephrased !== "undefined") {
			this.inferredOrRephrased = inferredOrRephrased;
		}
		// Note that this ignores the rules for when text content is considered set/unset.
		// This is necessary for fromData() rebuilding, which does not need the tree to be strictly valid.
	}

	/**
	 * Set all fields to an empty string, reverting the text content to a "not yet coded" state.
	 */
	unset() : void {
		this.main = "";
		this.prefix = "";
		this.suffix = "";
		this.inferredOrRephrased = "";
	}

	/**
	 * Returns whether the text content is set. If at least one of main and inferredOrRephrased is
	 * a non-empty string, the text content is considered set.
	 * NB: This function ignores the prefix and suffix fields.
	 */
	isSet() : Boolean {
		return !(this.main === "" && this.inferredOrRephrased === "");
	}

	/**
	 * Returns true if all text fields are empty OR
	 *  the main field has one of the default values for Junction text content,
	 *  which are ["and", "or"]. In that case, non-main fields are ignored.
	 */
	isEmptyOrJunctionDefault() : Boolean {
		return (
			(this.main === "" && this.prefix === "" && this.suffix === "" && this.inferredOrRephrased === "") ||
			(["and", "or"].includes(this.main))
		)
	}

	/**
	 * Concatenates the text content's prefix, main/inferredOrRephrased and suffix and returns the resulting string.
	 * If inferredOrRephrased is set, prints that in place of main, otherwise prints main.
	 * The resulting string will have exactly one space between each present component and no superfluous spaces.
	 * @return A string concatenated from the present components out of prefix, main, inferredOrRephrased and suffix
	 */
	getString() : string {
		let str: string = "";

		if (this.prefix) {
			str += this.prefix;
			if (this.main || this.inferredOrRephrased || this.suffix) {
				str += " ";
			}
		}

		if (this.main) {
			str += this.main;

			if (this.suffix) {
				str += " ";
			}
		} else if (this.inferredOrRephrased) {
			str += this.inferredOrRephrased;

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

