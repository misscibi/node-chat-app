// [{
//     id: 'lsdkjfsdlkfj',
//     name: 'Link',
//     room: 'Hyrule',
// }]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        const user = { id, name, room };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(element => element.id !== id);
        }
        return user;
    }
    getUser(id) {
        return this.users.find(user => user.id === id);
    }
    getUserList(room) {
        const users = this.users.filter(user => user.room === room);
        const namesArray = users.map(user => user.name);
        return namesArray;
    }
}

module.exports = { Users };