export interface User {
    id: number;
    name: string;
    email: string;
    provider: string;
    role: 'ADMIN' | 'CUSTOMER'; // Tambahkan role di sini
}

export enum Provider {
    CREDENTIALS = "CREDENTIALS",
    GOOGLE = "GOOGLE",
}
