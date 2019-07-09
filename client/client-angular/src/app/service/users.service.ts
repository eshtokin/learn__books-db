import { Inject, OnInit } from '@angular/core';
import Axios from 'axios';
import { parseSelectorToR3Selector } from '@angular/compiler/src/core';

export class UserService implements OnInit {
    constructor() {
    }

    users = [];

    url = {
        getAllUsers: 'http://localhost:3000/user',
        registrateUser: 'http://localhost:3000/registration',
        loginUser: 'http://localhost:3000/login'
    };

    login(user: {email: string, password: string}) {
        Axios.post('http://localhost:3000/login', user)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    registrate(user: {email: string, password: string, name: string, role: number}) {
        Axios.post('http://localhost:3000/registration', user)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

   async getAllUsers() {
    return await Axios.get('http://localhost:3000/user');
    }

    ngOnInit() {}
}
