import decode from 'jwt-decode';
import { User } from '../models/user.model';

export class UserInfo {
    // return true (if user have token) of false (if haven't token)
    isUserAuth(): boolean {
        if ( localStorage.hasOwnProperty('token') ) {
            return true;
        }
        return false;
    }

    // getCurrentUser(): User {
    //     return decode(localStorage.getItem('token'));
    // }

    // // return true (admin) or false (user)
    // getStatus(): boolean {
    //     const user = decode(localStorage.getItem('token'));
    //     if (1 === decode(localStorage.getItem('token')).role) {
    //         return true;
    //     }
    //     return false;
    // }

    logout(): void {
        localStorage.removeItem('token');
    }
}
