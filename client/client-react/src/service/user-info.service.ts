import decode from 'jwt-decode';
import { User } from '../models/user.model';

export const UserInfo = {
    // return true (if user have token) of false (if haven't token)
    isUserAuth(): boolean {
        if ( localStorage.hasOwnProperty('token') ) {
            return true;
        }
        return false;
    },

    getCurrentUser(): User {
        return decode(localStorage.getItem('token') as string);
    },

    // return true (admin) or false (user)
    getStatus(): boolean {
        const user: User = decode(localStorage.getItem('token') as string);
        if (1 === user.role) {
            return true;
        }
        return false;
    },

    logout(): void {
        localStorage.removeItem('token');
    }
}