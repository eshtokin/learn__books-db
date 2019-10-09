import AuthorAndCategory from "./author-and-category.model";

export default interface Book {
  authors: string[];
  authors_list: AuthorAndCategory[];
  categories: string[];
  categories_list: AuthorAndCategory[];
  description: string;
  image: string;
  industryIdentifiers: string | [];
  pageCount: number;
  printType: string;
  title: string;
  _id: string;
}