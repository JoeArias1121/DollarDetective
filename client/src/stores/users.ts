import session, {api, setUser} from './session';
import type { Budget } from './budgets';

export function addUser(username: string, password: string) {
    return api<boolean>(`users/${username}/${password}`, {}, 'PATCH')
}

export function signIn(username: string, password: string) {
    return api<User>(`users/${username}`, {}, 'PATCH').then(user => {
        if (user && user.password === password) {
            return user;
        } else {
            return false;
        }
    })
}

export function updateUser(user: User) {
    return api<User>(`users/${user.username}`, {user}, `POST`)
}

export function deleteUser(user: User) {
    return api<User>(`users/${user.username}`, {user}, `DELETE`)
}

export interface User {
    username: string
    password: string
    budgets: Budget[]
    activeTime: number
    hasCurrentWeek: boolean
}