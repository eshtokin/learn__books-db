import { OnInit } from '@angular/core';
import Axios from 'axios';

export class UserService implements OnInit {
    constructor() {
    }

    users = [];

    url = {
        getAllUsers: 'http://localhost:3000/user',
        registrateUser: 'http://localhost:3000/registration',
        loginUser: 'http://localhost:3000/login'
    };

    async login(user: {email: string, password: string}) {
        return await Axios.post('http://localhost:3000/login', user)
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => console.log(err));
    }

    async registrate(user: {email: string, password: string, name: string, role: number}) {
        return await Axios.post('http://localhost:3000/registration', user)
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => console.log(err));
    }

    async getAllUsers() {
        return await Axios.get('http://localhost:3000/user');
    }

    async delete(id: string) {
        return await Axios.delete(`http://localhost:3000/user/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    async edit(id: string, user: {email: string, password: string, name: string, role: number}) {
        return await Axios.put(`http://localhost:3000/user/${id}`, user)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }


    ngOnInit() {}
}
