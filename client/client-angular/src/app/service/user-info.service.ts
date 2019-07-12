import decode from 'jwt-decode';

export class UserInfo {
    constructor() { }

    isUserAuth() {
        if ( localStorage.hasOwnProperty('token') ) {
            return true;
        }
        return false;
    }

    getCurrentUser() {
        return decode(localStorage.getItem('token'));
    }

    getStatus() {
        const user = decode(localStorage.getItem('token'));
        if (1 === decode(localStorage.getItem('token')).role) {
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('token');
    }
}
