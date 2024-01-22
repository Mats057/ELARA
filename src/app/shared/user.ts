export interface User {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    phone: string;
}

export interface UserLogin {
    email: string;
    password: string;
}