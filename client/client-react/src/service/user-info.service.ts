import decode from 'jwt-decode';
import { User } from '../models/user.model';

export class UserInfo {
    public isAuth: boolean = false;

    // return true (if user have token) of false (if haven't token)
    public isUserAuth(): boolean {
        if ( localStorage.hasOwnProperty('token') ) {
            this.isAuth = true;
            return this.isAuth;
        }
        this.isAuth = false
        return this.isAuth;
    }

    public getCurrentUser(): User | null | undefined {
        if ( localStorage.hasOwnProperty('token') ) {
            return localStorage.getItem('token') ? decode(localStorage.getItem('token') as  string) : null;
        }
    }

    // return true (admin) or false (user)
    public getStatus(): boolean {
        let user: User;
        if (localStorage.hasOwnProperty('token')) {
            user = decode(localStorage.getItem('token') as string);
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
const UserInfoService = new UserInfo();
export default UserInfoService;