import userService from "../Services/userService.mjs";

class UserController {

    async list() {
        try {
            const users = await userService.list();
            return users;
        } catch (error) {
            throw new Error(error || "Error listing users");
        }
    };

    async show(id) {
        try {
            const user = await userService.show(id);
            return user;
        } catch (error) {
            throw new Error(error || "Error showing user");
        }
    };

    async create(user) {
        try {   
            const newUser = await userService.create(user);
            return newUser;
        } catch (error) {
            throw new Error(error || "Error creating user");
        }
    };

    async update(data) {
        try {
            const updatedUser = await userService.update(data);
            return updatedUser;
        } catch (error) {
            throw new Error(error || "Error updating user");        
        }
    };

    async delete(id) {
        try {
            const deletedUser = await userService.delete(id); 
            return deletedUser;
        } catch (error) {
            throw new Error(error || "Error deleting user");
        }
    };

};

export default new UserController();