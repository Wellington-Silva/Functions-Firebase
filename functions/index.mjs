import { onRequest, onCall } from "firebase-functions/v2/https";
import UserController from "./src/Controllers/UserController.mjs";
import TransformationService from "./src/Services/TransformationService.mjs";

export const listusers = onRequest(UserController.list);
export const showuser = onRequest(UserController.show);
export const createuser = onRequest(UserController.create);
export const updateuser = onRequest(UserController.update);
export const deleteuser = onRequest(UserController.delete);
export const processdata = onRequest((req, res) => TransformationService.processData(req, res));
