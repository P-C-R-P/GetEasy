const app = require('./index');
const request = require('supertest');
require('@babel/polyfill');

// user
const mocks = {item: {
      name: 'Pablo',
      description: '2000s boi',
      weight: 60,
      userId: 1
}, badItem: {
  }
}

beforeEach(() => {

})

// need to change check user and add error?
describe('get /check-user', () => {
  it('should return a 200 and user data if the email associated with the user exists', async () => {
    const response = await request(app).get('/check-user');
    expect(response.status).toBe(200);
    // expect response.body to equal ...
  })
})

describe('post /item', () => {
  it('should return a 201 if the item is successfully created', async ()=> {
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

afterAll(() => {

});