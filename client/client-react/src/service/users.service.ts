import { Axios } from './../interceptor/token.interceptor';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';
import { PaginationEvent } from '../models/pagination-event.model';
import { ServerResponce } from '../models/server-response.model';
import { AxiosResponse } from 'axios';

export class UserServiceClass {
    public login(user: {email: string, password: string}): Promise<AxiosResponse> {
        return Axios.post('/login', user)
        .then((res) => {
            localStorage.clear();
            localStorage.setItem('token', res.data.token);
            return res;
        })
    }

    public registrate(user: User): Promise<AxiosResponse> {
        return Axios.post('/registration', user)
        .then((res) => res)
    }


    public getAllUsers(pagination?: PaginationEvent): Promise<ServerResponce[]> {
        return Axios.get('/user', {params: pagination})
        .then((res) => {
            return res.data;
        })
    }

    public getSomeUsers(searchString: string, pagination: PaginationEvent): Promise<ServerResponce[]> {
        return Axios.get('/usersearch', {params: {searchString, pagination}})
        .then(res => res.data)
    }

    public getUser(id: string): Promise<User> {
        return Axios.get(`/user/${id}`)
        .then((res) => res.data)
    }

    public getUserBooks(books: string[], pagination: PaginationEvent, title?: string, ): Promise<ServerResponce[]> {
        return Axios.get('/userbooks', {params: {books, pagination, title}})
        .then((res) => res.data)
    }

    public addBookToProfile(book: Book): Promise<AxiosResponse> {
        return Axios.post(`/books/${book._id}`)
    }

    public getUserFavoriteBooks(): Promise<string[]> {
        return Axios.get('/userfavorites')
        .then((res) => res.data)
    }

    public delete(id: string): Promise<AxiosResponse> {
        return Axios.delete(`/user/${id}`)
        .then((res) => res)
    }

    public edit(id: string, user: User): Promise<AxiosResponse> {
        return Axios.put(`/user/${id}`, user)
    }
}

const UserService = new UserServiceClass();
export default UserService;