import decode from 'jwt-decode';
import { User } from '../models/user.model';

export class UserInfo {
    constructor() { }

    // return true (if user have token) of false (if haven't token)
    isUserAuth(): boolean {
        if ( localStorage.hasOwnProperty('token') ) {
            return true;
        }
        return false;
    }

    getCurrentUser(): User {
        return localStorage.getItem('token') ? decode(localStorage.getItem('token')) : null;
    }

    // return true (admin) or false (user)
    getStatus(): boolean {
        const user = decode(localStorage.getItem('token'));
        if (1 === user.role) {
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem('token');
    }
}
