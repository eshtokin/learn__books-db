export default interface UserInterface {
  book_list: object[];
  books: string[] | string;
  email: string;
  image: string | ArrayBuffer;
  name: string;
  password: string;
  role: number;
  _id: string;
}
