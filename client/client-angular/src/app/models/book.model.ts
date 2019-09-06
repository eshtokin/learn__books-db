export interface Book {
  authors: string[];
  authors_list?: object[];
  categories: string[];
  categories_list?: object[];
  description: string;
  image: string | ArrayBuffer;
  industryIdentifiers?: string;
  pageCount: number;
  printType: string;
  title: string;
  _id?: string;
  imageLinks?: {
    thumbnail: string
  };
  alreadyExistInBD?: boolean;
  inFavorite?: boolean;
}
