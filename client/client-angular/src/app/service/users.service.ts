import { OnInit } from '@angular/core';
import { Axios } from '../interceptor/token.interseptor';

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

    async registrate(user: {email: string, password: string, name: string, role: number}) {
        return await Axios.post('/registration', user)
        .then(res => {
            return res;
        })
        .catch(err => console.log(err));
    }

    async getAllUsers() {
        return await Axios.get('/user');
    }

    async delete(id: string) {
        return await Axios.delete(`/user/${id}`)
        .catch(err => console.log(err));
    }

    async edit(id: string, user: {email: string, password: string, name: string, role: number}) {
        return await Axios.put(`/user/${id}`, user)
        .catch(err => console.log(err));
    }

    ngOnInit() {}
}
