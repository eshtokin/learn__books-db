export default interface User {
  book_list: object[];
  books: string[];
  email: string;
  image: string | ArrayBuffer;
  name: string;
  password: string;
  role: number;
  _id: string;
}
