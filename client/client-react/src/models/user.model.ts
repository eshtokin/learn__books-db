export interface User {
  book_list?: object[];
  books?: string[] | string;
  email: string;
  image: string | ArrayBuffer;
  name: string;
  password: string;
  role: number;
  _id: string;
  id?: string;
}

// export interface UserForLoginReg {
//   email?: string | undefined;
//   password?: string | undefined;
//   name?: string | undefined;
// }