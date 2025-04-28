import app from "./app.mjs";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";

const firestore = getFirestore(app);

export default firestore;
export { FieldValue, Timestamp };