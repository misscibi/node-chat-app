const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Link',
            room: 'Hyrule',
        }, {
            id: '2',
            name: 'Zelda',
            room: 'Hyrule',
        }, {
            id: '3',
            name: 'Ganon',
            room: 'Gerudo',
        }];
    });

    it('should add new user', () => {
        const oldUsers = [...users.users];
        const user = {
            id: '12312434324',
            name: 'Link',
            room: 'Hyrule',
        };
        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([...oldUsers, user]);
    });

    it('should remove a user', () => {
        const userId = '3';
        const user = users.removeUser(userId);
        // expect(users.users).not.toMatchObject(user);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        const user = users.removeUser('4');

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        const userId = '1';
        const user = users.getUser(userId);
        // expect(user).toEqual(users.users[0]);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        const user = users.getUser('4');
        expect(user).toBeFalsy();
    });

    it('should return names for a room', () => {
        const userList = users.getUserList('Hyrule');

        expect(userList).toEqual(['Link', 'Zelda']);
    });
});
