// import { Axios } from '../interceptor/token.interseptor';
import Axios from 'axios';
import { User } from '../models/user.model';

class UserService {
    login(user: {email: string, password: string}) {
        return Axios.post('/login', user)
        .then(res => {
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

    // public getUser(id) {
    //     return Axios.get(`/user/${id}`)
    //     .then(res => {
    //         return res.data;
    //     })
    //     .catch(err => console.log(err));
    // }

    // public getUserBooks(books) {
    //     return Axios.get('/userbooks', {params: {books}})
    //     .then(res => res.data)
    //     .catch(err => console.log(err));
    // }

    public delete(id: string) {
        return Axios.delete(`/user/${id}`)
        .then(res => res)
        .catch(err => console.log(err));
    }

    async edit(id: string, user: User) {
        return await Axios.put(`/user/${id}`, user)
        .catch(err => console.log(err));
    }

    ngOnInit() {}
}

export default UserService;