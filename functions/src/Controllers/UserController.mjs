import userService from "../Services/UserService.mjs";

class UserController {

    async list(req, res) {
        try {
            const users = await userService.list();
            res.json(users);
            return;
        } catch (error) {
            console.log("LOG: ", error)
            throw new Error(error || "Error listing users");
        }
    };

    async show(req, res) {
        try {
            const { uid } = req.query;
            const user = await userService.show(uid);
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
        const data = { id: req.query.uid, name, age, address };
        try {
            const updatedUser = await userService.update(data);
            res.json(updatedUser);
            return;
        } catch (error) {
            throw new Error(error || "Error updating user");        
        }
    };

    async delete(req, res) {
        const uid = req.query.uid;
        try {
            const deletedUser = await userService.delete(uid); 
            res.json(deletedUser);
            return;
        } catch (error) {
            throw new Error(error || "Error deleting user");
        }
    };

};

export default new UserController();