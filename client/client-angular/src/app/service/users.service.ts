import { Axios } from '../interceptor/token.interseptor';
import { User } from '../models/user.model';

export class UserService {
    public count() {
        return Axios.get('/userscount')
        .then(res => res.data)
        .catch(err => console.log(err));
      }

    public login(user: {email: string, password: string}): Promise<any> {
        return Axios.post('/login', user)
        .then(res => {
            localStorage.clear();
            localStorage.setItem('token', res.data.token);
            return res;
        })
        .catch(err => console.log(err));
    }

    public registrate(user: User): Promise<any> {
        return Axios.post('/registration', user)
        .then(res => res)
        .catch(err => console.log(err));
    }

    public getAllUsers(): Promise<any> {
        return Axios.get('/user')
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err));
    }

    public getSomeUsers(searchString: string): Promise<any> {
        return Axios.get('/usersearch', {params: {searchString}})
        .then(res => res.data)
        .catch(err => console.log(err));
    }

    public getUser(id: string): Promise<any> {
        return Axios.get(`/user/${id}`)
        .then(res => res.data)
        .catch(err => console.log(err));
    }

    public getUserBooks(books: string[], title?: string): Promise<any> {
        return Axios.get('/userbooks', {params: {books, title}})
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
