import { onRequest } from "firebase-functions/v2/https";
import UserController from "./src/controllers/UserController.mjs";
import TransformationService from "./src/services/TransformationService.mjs";

export const listusers = onRequest(UserController.list);
export const showuser = onRequest(UserController.show);
export const createuser = onRequest(UserController.create);
export const updateuser = onRequest(UserController.update);
export const deleteuser = onRequest(UserController.delete);
export const processdata = onRequest((req, res) => TransformationService.processData(req, res));

