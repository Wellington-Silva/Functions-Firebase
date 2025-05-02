import { v4 as uuidv4 } from 'uuid';
import UserRepository from '../repositories/UserRepository.mjs';

class UserService {
    
    async list() {
        const users = await UserRepository.listUsers();
        return users;
    };

    async show(id) {
        const user = await UserRepository.getUserByUid(id);
        return user;
    };

    async create(user) {
        const uid = uuidv4();
        const userData = {
            name: user.name,
            age: user.age,
            address: {
                number: user.address.number,
                streetName: user.address.streetName,
                cityName: user.address.cityName,
                state: user.address.state,
                placeId: user.address.placeId
            }
        };

        const userCreated = await UserRepository.createUser(uid, userData);
        return userCreated;
    };

    async update(data) {
        const userUpdated = await UserRepository.updateUser(data.id, data);
        return userUpdated;
    };

    async delete(id) {
        const user = await UserRepository.deleteUser(id);
        return user;
    };

};

export default new UserService();