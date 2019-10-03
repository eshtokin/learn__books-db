import { Axios } from '../interceptor/token.interseptor';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';
import { PaginationEvent } from '../models/pagination-event.model';
import { ServerResponce } from '../models/server-response.model';

export class UserService {
    public login(user: {email: string, password: string}): Promise<any> {
        return Axios.post('/login', user)
        .then(res => {
            localStorage.clear();
            localStorage.setItem('token', res.data.token);
            return res;
        })
    }

    public registrate(user: User): Promise<any> {
        return Axios.post('/registration', user)
        .then(res => res)
        .catch(err => console.log(err));
    }


    public getAllUsers(pagination?: PaginationEvent): Promise<any> {
        return Axios.get('/user', {params: pagination})
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err));
    }

    public getSomeUsers(searchString: string, pagination: PaginationEvent): Promise<any> {
        return Axios.get('/usersearch', {params: {searchString, pagination}})
        .then(res => res.data)
        .catch(err => console.log(err));
    }

    public getUser(id: string): Promise<User> {
        return Axios.get(`/user/${id}`)
        .then(res => res.data)
        .catch(err => console.log(err));
    }

    public getUserBooks(books: string[], pagination: PaginationEvent, title?: string, ): Promise<ServerResponce> {
        return Axios.get('/userbooks', {params: {books, pagination, title}})
        .then(res => res.data)
        .catch(err => console.log(err));
    }

    public addBookToProfile(book: Book): Promise<any> {
        return Axios.post(`/books/${book._id}`)
        .then(res => res.data)
        .catch(err => console.log(err));
    }

    public getUserFavoriteBooks(): Promise<string[]> {
        return Axios.get('/userfavorites')
        .then(res => res.data)
        .catch(err => console.log(err));
    }

    public delete(id: string): Promise<any> {
        return Axios.delete(`/user/${id}`)
        .then(res => res)
        .catch(err => console.log(err));
    }

    public edit(id: string, user: User): Promise<any> {
        return Axios.put(`/user/${id}`, user)
        .catch(err => console.log(err));
    }
}
