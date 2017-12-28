import { Book } from './book';

export class Library{
    name: string;
    location: string;  
    isLocked: boolean;
    contents: Book[];
    // Display information
    // TODO: Probably refactor into indiv library component
    lockButtonText: string;
    isBrowsing: boolean = false;

    lockButtonClicked(): void{
        console.log("Unlock button clicked, was: " + this.isLocked);
        this.isLocked = !this.isLocked;
        console.log("Now: " + this.isLocked);

        this.lockButtonText = this.getText();
    }

    toggleBrowse() {
        this.isBrowsing = !this.isBrowsing;
    }    

    getText(): string{
        if(!this.isLocked)
            return "Unlocked!";
        else
            return "Unlock Button";
    }

    constructor(name: string, loc: string, locked: boolean, contents: Book[]) {
        this.name = name;
        this.location = loc;
        this.isLocked = locked;
        this.lockButtonText = this.getText();
        this.contents = contents;
    }
}