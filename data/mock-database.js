import Faker from 'faker';

export class User extends Object {}

export function getUsers() {
  let users = [];

  for (let i = 0; i < 25; i++) {
    const user = new User();
    user.id = Faker.random.uuid();
    user.firstName = Faker.name.firstName();
    user.lastName = Faker.name.lastName();
    user.email = Faker.internet.email();
    user.avatar = Faker.internet.avatar();

    users = [user, ...users];
  }

  return users;
}
