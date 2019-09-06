import decode from 'jwt-decode';
import { User } from '../models/user.model';

export class UserInfo {
    constructor() {
        console.log('enter in user info');
    }

    // return true (if user have token) of false (if haven't token)
    public isUserAuth(): boolean {
        if ( localStorage.hasOwnProperty('token') ) {
            return true;
        }
        return false;
    }

    public getCurrentUser(): User | null {
        if ( localStorage.hasOwnProperty('token') ) {
            return localStorage.getItem('token') ? decode(localStorage.getItem('token')) : null;
        }
    }

    // return true (admin) or false (user)
    public getStatus(): boolean {
        let user;
        if (localStorage.hasOwnProperty('token')) {
            user = decode(localStorage.getItem('token'));
            if (1 === user.role) {
                return true;
            }
        }
        return false;
    }

    public logout(): void {
        localStorage.removeItem('token');
    }
}
