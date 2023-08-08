const app = require('./index');
const request = require('supertest');
require('@babel/polyfill');
// const bcrypt = require('bcryptjs');

const mocks = {
  registeredUser: {
    name: 'Pablo and Philippa',
    email: 'panettyfycgdp@gmail.com',
    password: 'IamcuterthanPablo24!',
  },
  registeredUserWithHashedPassword: {
    // The password hashing may change.
    name: 'Pablo and Philippa',
    email: 'panettyfycgdp@gmail.com',
    password: '$2a$10$GlPiZP93HYfl9Av/JZTg/.8faXPhKAvpgebaN0DH9UUNoadjQHefm',
    id: 3,
  },
  item: {
    name: 'Pablo',
    description: '2000s boi',
    weight: 60,
    userId: 1,
    weightMeasurement: 'kg',
  },
  registeredUserWrongPassword: {
    name: 'Pablo and Philippa',
    email: 'panettyfycgdp@gmail.com',
    password: 'IamnotcuterthanPablo24!',
  },
  newUser1: {
    // The email should be changed every time we test for a new user.
    name: 'Me',
    email: 'ab12569089876@gmail.com',
    password: 'Verygoodpassword123@',
  },
  newUser2: {
    // The email should be changed every time we test for a new user.
    name: 'Me',
    email: 'ab12568sdfsd76@gmail.com',
    password: 'Verygoodpassword123@',
  },
  badItem: {},
};


// MAKE AUTHENTICATION WORK
beforeEach(async () => {
  const loginResponse = await request(app)
    .post('/user')
    .send(mocks.registeredUser);
  console.log('login response', loginResponse.body.password);
  const response = await request(app)
    .get(`user/${mocks.registeredUserWithHashedPassword.id}`)
    .set('Authorization', `bearer ${loginResponse.body.password}`)
    .send({});
  console.log(response);
})

describe('post /user', () => {
  it('should return a 200 if the email was already registered.', async () => {
    const user = mocks.registeredUser;
    const userWithHashedPassword = mocks.registeredUserWithHashedPassword;
    const response = await request(app).post('/user').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userWithHashedPassword);
  })
  it('should return a 201 if the email was successfully registered.', async () => {
    const newUser = mocks.newUser1;
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
    const newUser = mocks.newUser2;
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

// FINISH GETTING ITEMS FOR USER
describe('get /:userId', () => {
  it('should return a 200 and own items.', async () => {
    const response = await request(app).get('/:userId');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  })
})


// FINISH POSTING ITEMS
describe.only('post /item', () => {
  it('should return a 201 and the created item if a name is provided.', async () => {
    const item = mocks.item;
    const response = await request(app).post('/item').send(item);
    expect(response.status).toBe(201);
  })
  it('should return a 400 if no name is provided.', async () => {
    const userWithWrongPassword = mocks.registeredUserWrongPassword;
    const response = await request(app).post('/user').send(userWithWrongPassword);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ key: 'Incorrect password.' });
  })
})