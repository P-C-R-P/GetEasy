const app = require('./index');
const request = require('supertest');
require('@babel/polyfill');
const bcrypt = require('bcryptjs');

// user

const mocks = {
  registeredUser: { name: 'Pablo and Philippa', email: 'panettyfycgdp@gmail.com', password: 'IamcuterthanPablo24!' },
  registeredUserWithHashedPassword: { name: 'Pablo and Philippa', email: 'panettyfycgdp@gmail.com', password: '$2a$10$4cuzzPWAETEh6lcljOhqmO61s6tv4zFdSzmYvuPurnUaZByUkUzz.', id: 3 },
  item: {
    name: 'Pablo',
    description: '2000s boi',
    weight: 60,
    userId: 1,
    weightMeasurement: 'kg',
  },
  registeredUserWrongPassword: {
    name: 'Pablo and Philippa', email: 'panettyfycgdp@gmail.com', password: 'IamnotcuterthanPablo24!'
  },
  newUser: {
    // The email should be changed every time we test for a new user.
    name: 'Me', email: 'ab12@gmail.com', password: 'Verygoodpassword123@'
  },
  badItem: {
  }
}



beforeEach(async () => {
  const loginResponse = await request(app)
    .post('/user')
    .send(mocks.registeredUser);
})


/*
// need to change check user and add error?
describe.only('get /check-user', () => {
  it('should return a 200 and user data if the email associated with the user exists', async () => {
    const response = await request(app).get('/check-user');
    //console.log('this is the respones', response.res);
    expect(response.status).toBe(200);
    // expect response.body to equal ...
  })
})

describe('post /item', () => {
  it('should return a 201 if the item is successfully created', async () => {
    const item = mocks.item;
    const response = await request(app).post('/item').send(item);
    expect(response.status).toBe(201);
    expect(response.body).toBe(item);
  })
  it('should return a 400 if the item creation was unsuccessful (if no name is provided)', async () => {
    const badItem = mocks.badItem;
    const response = await request(app).post('/item').send(badItem);
    expect(response.status).toBe(400);
    expect(response.body).toBe('Failed to create item; please provide a name.');
  })
})

*/
describe('post /user', () => {
  it('should return a 200 if the email was already registered.', async () => {
    const user = mocks.registeredUser;
    const userWithHashedPassword = mocks.registeredUserWithHashedPassword;
    const response = await request(app).post('/user').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userWithHashedPassword);
  })
  it('should return a 201 if the email was successfully registered.', async () => {
    const newUser = mocks.newUser;
    const response = await request(app).post('/user').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.name).toEqual(newUser.name);
    expect(response.body.email).toEqual(newUser.email);
  })
  it('should return a 400 if the provided password is wrong.', async () => {
    const userWithWrongPassword = mocks.registeredUserWrongPassword;
    const response = await request(app).post('/user').send(userWithWrongPassword);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ key: 'Incorrect password.' });
  })
})

describe('post /check-email', () => {
  it('should return an user and a 200 if the email is already registered.', async () => {
    const user = mocks.registeredUser;
    const userWithHashedPassword = mocks.registeredUserWithHashedPassword;
    const response = await request(app).post('/check-email').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userWithHashedPassword);
  })
  it('should return a 404 if the email is not registered.', async () => {
    const newUser = mocks.newUser;
    const response = await request(app).post('/check-email').send(newUser);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ key: 'No matching email in database.' });
  })
})

describe('get /', () => {
  it('should return a 200 and all items.', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  })
})

// FINISH
describe('get /:userId', () => {
  it('should return a 200 and own items.', async () => {
    const response = await request(app).get('/:userId');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  })
})

describe.only('post /item', () => {
  it.only('should return a 201 and the created item if a name is provided.', async () => {
    const item = mocks.item;
    console.log(item);
    const response = await request(app).post('/item').send(item);
    expect(response.status).toBe(201);
    console.log(response.body);
    //expect(response.body.name).toEqual(newUser.name);
  })
  it('should return a 400 if no name is provided.', async () => {
    const userWithWrongPassword = mocks.registeredUserWrongPassword;
    const response = await request(app).post('/user').send(userWithWrongPassword);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ key: 'Incorrect password.' });
  })
})