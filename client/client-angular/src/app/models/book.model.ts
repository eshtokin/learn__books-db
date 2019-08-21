export interface Book {
  authors: string[];
  author_list?: object[];
  categories: string[];
  categories_list?: object[];
  description: string;
  image: string | ArrayBuffer;
  industryIdentifiers?: object[];
  pageCount: number;
  printType: string;
  title: string;
  _id?: string;
  imageLinks?: {
    thumbnail: string
  };
}
