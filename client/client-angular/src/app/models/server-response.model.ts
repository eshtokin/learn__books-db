import { User } from './user.model';
import { Book } from './book.model';

export interface ServerResponce {
  listOfItem: User[] | Book[];
  totalCount: {count: number}[];
}
