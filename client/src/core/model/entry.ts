/**
 * An Entry represents a statement and holds its full text.
 * Norm and Convention nodes hold Entries.
 * The text of a statement is found complete in its Entry, and broken down
 * in the Components in the node's children.
 */
export class Entry {
    content?: string; // The complete, undivided text of this entry - the statement

    /**
     * Create a new Entry with a statement if provided.
     * @param content (Optional) The full text of the statement
     */
    constructor(content?: string) {
		if (content) {
			this.content = content;
		}
    }

	/**
     * Overwrite this Entry's content.
     * @param content The full text of the statement
     */
	set(content: string) {
		this.content = content;
	}

	/**
	 * Set this Entry's content to undefined.
	 */
	unset() {
		this.content = undefined;
	}
}
