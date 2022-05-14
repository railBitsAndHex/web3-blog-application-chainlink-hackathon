import { AuthContextInterface } from '../types/authContext';
const AuthStateInitial : AuthContextInterface = {
    isAuthenticated: false,
    accounts: [],
    error: "",
    login: () => console.log("Login from context"),
    threeIdLogin: () => console.log("Three Id login from context"),
    logout: () => console.log("Logout from context"),
    setError: (err: string) => console.log(err)
}

export {AuthStateInitial}