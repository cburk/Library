export class Book{
    id: string;
    title: string;
    author: string;
    coverImg: string;  
    libraryId: string;
    owner: string;
    available: boolean;

    constructor(    
        id: string,
        title: string,
        author: string,
        coverImg: string,
        libraryId: string,
        owner: string,
        available: boolean,
     ){
        this.id = id;
        this.title = title;
        this.author = author;
        this.coverImg = coverImg;
        this.libraryId = libraryId;
        this.owner = owner;
        this.available = available;
     }

    public static EmptyBook: Book = new Book(
        "",
        "fff",
        "asddd",
        "",
        "",
        "",
        true
    );
};
