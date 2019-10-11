import { Axios } from './../interceptor/token.interceptor';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';
import { PaginationEvent } from '../models/pagination-event.model';
import { ServerResponce } from '../models/server-response.model';
import { AxiosResponse } from 'axios';

export class UserServiceClass {
    public async login(user: {email: string, password: string}): Promise<AxiosResponse> {
        const response = await Axios.post('/login', user);
        localStorage.clear();
        localStorage.setItem('token', response.data.token);
        return response;
    }

    public async registrate(user: User): Promise<AxiosResponse> {
        const response = await Axios.post('/registration', user);
        return response;
    }

    public async getAllUsers(pagination?: PaginationEvent): Promise<ServerResponce[]> {
        const response = await Axios.get('/user', {params: {pagination}});
        return response.data;
    }

    public async getSomeUsers(searchString: string, pagination: PaginationEvent): Promise<ServerResponce[]> {
        const response = await Axios.get('/usersearch', {params: {searchString, pagination}});
        return response.data;
    }

    public async getUser(id: string): Promise<User> {
        const response = await Axios.get(`/user/${id}`);
        return response.data;
    }

    public async getUserBooks(books: string[], pagination: PaginationEvent, title?: string, ): Promise<ServerResponce[]> {
        const response = await Axios.get('/userbooks', {params: {books, pagination, title}});
        return response.data;
    }

    public async addBookToProfile(book: Book): Promise<AxiosResponse> {
        return await Axios.post(`/books/${book._id}`);
    }

    public async getUserFavoriteBooks(): Promise<string[]> {
        const response = await Axios.get('/userfavorites');
        return response.data;
    }

    public async delete(id: string): Promise<AxiosResponse> {
        return await Axios.delete(`/user/${id}`);
    }

    public async edit(id: string, user: User): Promise<AxiosResponse> {
        return await Axios.put(`/user/${id}`, user);
    }
}

const UserService = new UserServiceClass();
export default UserService;