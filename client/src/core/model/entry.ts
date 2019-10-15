/**
 * An Entry represents a statement.
 */
export default class Entry {
    content!: string;

    public static createEntry(content: string): Entry {
        return Object.assign(new Entry(), {
            content
        })
    }
 }
