import { Axios } from '../interceptor/token.interseptor';
import { User } from '../models/user.model';

export class UserService {
    login(user: {email: string, password: string}) {
        return Axios.post('/login', user)
        .then(res => {
            localStorage.clear();
            localStorage.setItem('token', res.data.token);
            return res;
        })
        .catch(err => console.log(err));
    }

    registrate(user: User) {
        return Axios.post('/registration', user)
        .then(res => {
            return res;
        })
        .catch(err => console.log(err));
    }

    getAllUsers() {
        return Axios.get('/user');
    }

    getUser(id) {
        return Axios.get(`/user/${id}`)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err));
    }

    getUserBooks(books: string[]) {
        return Axios.get('/userbooks', {params: {books}})
        .then(res => res.data)
        .catch(err => console.log(err));
    }

    delete(id: string) {
        return Axios.delete(`/user/${id}`)
        .then(res => res)
        .catch(err => console.log(err));
    }

     edit(id: string, user: User) {
        return Axios.put(`/user/${id}`, user)
        .catch(err => console.log(err));
    }
}
