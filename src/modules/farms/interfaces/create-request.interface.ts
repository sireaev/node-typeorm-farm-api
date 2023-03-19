export interface CreateFarmRequest<T> {
    token: {
        id: string;
        email: string;
        iat: number;
        exp: number;
    }
    body: T
}
