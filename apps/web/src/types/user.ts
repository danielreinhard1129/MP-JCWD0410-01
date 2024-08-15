export interface User{
    id: number;
    name: string
    email: string
    provider: string
}

enum Provider{
    CREDENTIALS = "CREDENTIALS",
    GOOGLE = "GOOGLE",
}