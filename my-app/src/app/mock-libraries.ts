import { Library } from './library';
import { BOOKS } from './mock-books'

export const LIBRARIES: Library[] = [
    new Library("Library 1", "123 N 1st St", true, BOOKS),
    new Library("Library 2", "123 N 1st St", true, BOOKS),
    new Library("Library 3", "123 N 1st St", true, BOOKS),
];