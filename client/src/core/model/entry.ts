/**
 * An Entry represents a statement.
 */
export default class Entry {
    content!: string; // The complete, undivided text of this entry - the statement
    documentId!: number;

    public static createEntry(content: string, documentId: number): Entry {
        return Object.assign(new Entry(), {
            content,
            documentId
        })
    }
 }
