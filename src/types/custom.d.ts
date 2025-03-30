import { AuthObject } from "@clerk/backend";

declare module "express" {
  interface Request {
    auth?: AuthObject;
  }
}
