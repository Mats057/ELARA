export interface User {
    name: string;
    lastName: string;
    age: number;
    username: string;
    password: string;
    email: string;
}

export interface UserLogin {
    email: string;
    password: string;
}