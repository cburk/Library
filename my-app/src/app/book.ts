export class Book{
    bookId: string;
    title: string;
    author: string;
    coverImg: string;  
    libraryId: string;
    owner: string;
    available: boolean;

    constructor(    
        bookId: string,
        title: string,
        author: string,
        coverImg: string,
        libraryId: string,
        owner: string,
        available: boolean,
     ){
        this.bookId = bookId;
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
