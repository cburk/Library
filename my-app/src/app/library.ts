export class Library{
    name: string;
    location: string;  
    isLocked: boolean;
    lockButtonText: string;

    lockButtonClicked(): void{
        console.log("Unlock button clicked, was: " + this.isLocked);
        this.isLocked = !this.isLocked;
        console.log("Now: " + this.isLocked);

        this.lockButtonText = this.getText();
    }

    getText(): string{
        if(!this.isLocked)
            return "Unlocked!";
        else
            return "Unlock Button";
    }

    constructor(name: string, loc: string, locked: boolean) {
        this.name = name;
        this.location = loc;
        this.isLocked = locked;
        this.lockButtonText = this.getText();
    }
}