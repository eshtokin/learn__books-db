import { Axios } from '../interceptor/token.interceptor';
import { User } from '../models/user.model';

const UserService = {
    login(user: {email: string | undefined, password: string | undefined}) {
        return Axios.post('/login', user)
        .then(res => {
            localStorage.clear();
            localStorage.setItem('token', res.data.token);
            return res;
        })
        .catch(err => console.log(err));
    },

    registrate(user: {email: string | undefined, password: string | undefined, name: string | undefined}) {
        return Axios.post('/registration', user)
        .then(res => {
            return res;
        })
        .catch(err => console.log(err));
    },

    getAllUsers() {
        return Axios.get('/user');
    },

    getUser(id: string | undefined) {
        return Axios.get(`/user/${id}`)
        .then(res => {
            return res.data;
        })
        .catch(err => console.log(err));
    },

    getUserBooks(books: string[] | undefined | string) { //delete undefined and string
        return Axios.get('/userbooks', {params: {books}})
        .then(res => res.data)
        .catch(err => console.log(err));
    },

    delete(id: string) {
        return Axios.delete(`/user/${id}`)
        .then(res => res)
        .catch(err => console.log(err));
    },

    async edit(id: string, user: User) {
        return await Axios.put(`/user/${id}`, user)
        .catch(err => console.log(err));
    }
}

export default UserService;