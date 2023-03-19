import { UnprocessableEntityError } from "errors/errors";
import { GenericHttpError } from "errors/httpError";
import { NextFunction, Request, Response } from "express";

export function handleErrorMiddleware(error: GenericHttpError, _: Request, res: Response, next: NextFunction): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { message, status } = error;

  if (error instanceof UnprocessableEntityError) {
    res.status(422).send({ name: "UnprocessableEntityError", message });
  }

  if (!(error instanceof UnprocessableEntityError)) {
    switch(status) {
      case 401: res.status(401).send({ message: "Unauthorized"}); break;
      case 422: res.status(422).send({ name: "UnprocessableEntityError", message }); break;
      default: 
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" }); break;
    }
  }

  next();
}
