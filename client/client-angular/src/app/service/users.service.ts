import { OnInit } from '@angular/core';
import { Axios } from '../interceptor/token.interseptor';
import { User } from '../models/user.model';

export class UserService implements OnInit {
    constructor() {
    }

    async login(user: {email: string, password: string}) {
        return await Axios.post('/login', user)
        .then(res => {
            return res;
        })
        .catch(err => console.log(err));
    }

    async registrate(user: User) {
        return await Axios.post('/registration', user)
        .then(res => {
            return res;
        })
        .catch(err => console.log(err));
    }

    async getAllUsers() {
        return await Axios.get('/user');
    }

    public getUser(id) {
        return Axios.get(`/user/${id}`)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err));
    }

    public getUserBooks(books) {
        console.log('get user books: ', books);
        return Axios.get('/userbooks', {params: {books}})
        .then(res => res.data)
        .catch(err => console.log(err));
    }

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
