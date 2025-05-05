import firestore, { Timestamp } from "../config/firestore.mjs";

class UserRepository {
    #database;

    constructor() {
        this.#database = firestore;
    }

    async listUsers() {
        const usersRef = this.#database.collection("users");
        const users = await usersRef.where("createdAt", "!=", null).limit(10).get();
        if (users.empty) return "Nenhum usuário encontrado";
        return users.docs.map(user => {
            const userData = user.data();
            return { ...userData, uid: user.id };
        });
    };

    async getUserByUid(uid) {
        const userDoc = await this.#database.collection("users").doc(uid).get();
        if (!userDoc.exists) return undefined;

        const userData = userDoc.data();
        return { ...userData, uid };
    };

    async createUser(uid, data) {
        const userData = { ...data, createdAt: Timestamp.now() };
        await this.#database.collection("users").doc(uid).set(userData);
        return { uid, ...userData };
    };

    async updateUser(uid, data) {
        const userDoc = await this.#database.collection("users").doc(uid).get();
        if (!userDoc.exists) return undefined;

        const userData = { ...data, updatedAt: Timestamp.now() };
        await this.#database.collection("users").doc(uid).update(userData);
        return { uid, ...userData };
    };

    async deleteUser(uid) {
        const userDoc = await this.#database.collection("users").doc(uid).get();
        if (!userDoc.exists) return undefined;

        await this.#database.collection("users").doc(uid).delete();
        return { uid };
    };
};

export default new UserRepository();