import { Axios } from '../core.module/interceptor/token.interseptor';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';
import { PaginationEvent } from '../models/pagination-event.model';
import { ServerResponceWithBook } from '../models/server-response.model';

export class UserService {
    public async login(user: {email: string, password: string}): Promise<any> {
        const response = await Axios.post('/login', user);
        localStorage.clear();
        localStorage.setItem('token', response.data.token);
        return response;
    }

    public async registrate(user: User): Promise<any> {
       return await Axios.post('/registration', user);
    }

    public async getAllUsers(pagination?: PaginationEvent): Promise<any> {
        const response = await Axios.get('/user', {params: {pagination}});
        return response.data;
    }

    public async getSomeUsers(searchString: string, pagination: PaginationEvent): Promise<any> {
        const response = await Axios.get('/usersearch', {params: {searchString, pagination}});
        return response.data;
    }

    public async getUser(id: string): Promise<User> {
        const response = await Axios.get(`/user/${id}`);
        return response.data;
    }

    public async getUserBooks(books: string[], pagination: PaginationEvent, title?: string, ): Promise<ServerResponceWithBook> {
        const response = await Axios.get('/userbooks', {params: {books, pagination, title}});
        return response.data;
    }

    public async addBookToProfile(book: Book): Promise<any> {
        const response = await Axios.post(`/books/${book._id}`);
        return response.data;
    }

    public async getUserFavoriteBooks(): Promise<string[]> {
        const response = await Axios.get('/userfavorites');
        return response.data;
    }

    public async delete(id: string): Promise<any> {
        const response = await Axios.delete(`/user/${id}`);
        return response.data;
    }

    public async edit(id: string, user: User): Promise<any> {
        const response = await Axios.put(`/user/${id}`, user);
        return response.data;
    }
}
