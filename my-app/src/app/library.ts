import { Book } from './book';

export class Library{
    id: string;
    name: string;
    location: string;  
    isLocked: boolean;
    contents: Book[];
    // Display information
    // TODO: Probably refactor into indiv library component
    lockButtonText: string;
    isBrowsing: boolean = false;

    // Invalid library for when a service call to get library fails
    public static InvalidLibrary: Library = new Library("N/A", "N/A", false, null);

    constructor(name: string, loc: string, locked: boolean = true, contents: Book[]) {
        this.name = name;
        this.location = loc;
        this.isLocked = locked;
        this.lockButtonText = "";
        this.contents = contents;
    }
}