import userService from "../Services/UserService.mjs";

class UserController {

    async list(req, res) {
        try {
            const users = await userService.list();
            if (!users) res.json({ error: false, message: "Users Notfound" });
            res.json(users);
            return;
        } catch (error) {
            throw new Error(error || "Error listing users");
        }
    };

    async show(req, res) {
        const { uid } = req.query;

        if (!uid) {
            return res.status(400).json({ error: "ID do usuário não informado." });
        }

        try {
            const user = await userService.show(uid);
            if (!user) res.json({ error: false, message: "User Notfound" });
            res.json(user);
            return;
        } catch (error) {
            throw new Error(error || "Error showing user");
        }
    };

    async create(req, res) {
        const { name, age, address } = req.body;

        if (!name || typeof name !== "string" || name.length < 3) {
            return res.status(400).json({ error: "Nome é obrigatório e deve ter ao menos 3 caracteres." });
        }
    
        if (!age || isNaN(age)) {
            return res.status(400).json({ error: "Idade inválida ou não informada." });
        }

        try {
            const userData = { name, age , address };
            const newUser = await userService.create(userData);
            res.json(newUser);
            return;
        } catch (error) {
            throw new Error(error || "Error creating user");
        }
    };

    async update(req, res) {
        const { name, age, address } = req.body;

        if (!name || typeof name !== "string" || name.length < 3) {
            return res.status(400).json({ error: true, message: "Nome é obrigatório e deve ter ao menos 3 caracteres." });
        };

        if (!age || isNaN(age)) {
            return res.status(400).json({ error: true, message: "Idade inválida ou não informada." });
        };

        if (!address || typeof address !== "object") {
            return res.status(400).json({ error: true, message: "Endereço não informado" });
        };

        const data = { id: req.query.uid, name, age, address };
        try {
            const updatedUser = await userService.update(data);
            if (!updatedUser) res.json({ error: false, message: "User not updated" });
            res.json(updatedUser);
            return;
        } catch (error) {
            throw new Error(error || "Error updating user");        
        }
    };

    async delete(req, res) {
        const uid = req.query.uid;
        
        if (!uid) 
            return res.status(400).json({ error: "ID do usuário não informado." });

        try {
            const deletedUser = await userService.delete(uid);
            if (!deletedUser) res.json({ error: false, message: "User not deleted" });
            res.json(deletedUser);
            return;
        } catch (error) {
            throw new Error(error || "Error deleting user");
        }
    };

};

export default new UserController();