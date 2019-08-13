import { string } from "prop-types";

export interface Book {
  authors: string[];
  authors_list?: object[];
  categories: string[];
  categories_list?: object[];
  description: string;
  image: string | ArrayBuffer;
  imageLinks?: {
    thumbnail: string
  };
  industryIdentifiers?: object[];
  pageCount: number;
  printType: string;
  title: string;
}
