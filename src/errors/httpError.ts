import { DeepPartial } from "typeorm";

export interface GenericHttpError {
    message: string | undefined;
    code: string | undefined;
    status: number | undefined;
    inner?: {
        message: string | undefined
    }
}

export class GenericHttpError implements GenericHttpError {
    public message: string | undefined;
    public code: string | undefined;
    public status: number | undefined;
    public inner?: {
        message: string | undefined;
    }

    constructor(error: DeepPartial<GenericHttpError>) {
        if (error) {
            this.message = error.message;
            this.code = error.code;
            this.status = error.status;
        }
    }
}
