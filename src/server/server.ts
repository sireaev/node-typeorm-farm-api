import express, { Express } from "express";
import { handleErrorMiddleware } from "middlewares/error-handler.middleware";
import routes from "routes";
import config from "config/config";
import { verify } from "middlewares/verify-token.middleware";

export function setupServer(): Express {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", verify);

  app.use(`/api/${config.API_VERSION}`, routes);
  app.use(handleErrorMiddleware);

  return app;
}
