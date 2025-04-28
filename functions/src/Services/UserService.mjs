import UserRepository from '../Repositories/UserRepository.mjs';

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
        const userData = {
            name: user.name.toString(),
            age: parseInt(user.age),
            address: {
                number: parseInt(user.address.number),
                streetName: user.address.street.toString(),
                cityName: user.address.city.toString(),
                state: user.address.state.toString(),
                placeId: user.address.placeId.toString()
            },
            createdAt: new Date()
        };

        const user = await UserRepository.createUser(userData);
        return user;
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