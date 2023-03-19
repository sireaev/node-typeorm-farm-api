import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "config/config";
import { GenericHttpError } from "errors/httpError";

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

const whiteList = [
    `/api/${config.API_VERSION}/auth/login`,
    `/api/${config.API_VERSION}/users`
];

export const verify = (req: Request, res: Response, next: NextFunction) => {
 try {
    if (whiteList.includes(req.url)) {
        return next();
    }

   const token = req.header("Authorization")?.replace("Bearer ", "");

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, config.JWT_SECRET);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
    res.status(401)
    throw new GenericHttpError({ status: 401, message: "Unauthorized" })
   res.status(401).send("Please authenticate");
 }
};
