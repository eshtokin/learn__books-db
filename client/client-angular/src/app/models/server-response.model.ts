import { User } from './user.model';
import { Book } from './book.model';

export interface ServerResponceWithBook {
  listOfItem: Book[];
  totalCount: {count: number}[];
}

export interface ServerResponceWithUser {
  listOfItem: User[];
  totalCount: {count: number}[];
}
