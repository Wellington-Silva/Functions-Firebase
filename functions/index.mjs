import logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onRequest, onCall } from "firebase-functions/v2/https";

import UserController from "./src/Controllers/UserController.mjs";

export const listusers = onRequest(UserController.list);
export const createuser = onRequest(UserController.create);