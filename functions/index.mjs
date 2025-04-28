import logger from "firebase-functions/logger";
import { getFirestore } from "firebase-admin/firestore";
import { onRequest, onCall } from "firebase-functions/v2/https";

import UserController from "./src/Controllers/UserController.mjs";

export const listusers = onRequest(UserController.list);
export const showuser = onRequest(UserController.show);
export const createuser = onRequest(UserController.create);
export const updateuser = onRequest(UserController.update);
export const deleteuser = onRequest(UserController.delete);