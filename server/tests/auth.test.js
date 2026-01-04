const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../models/User');

beforeAll(async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/maestrolink_test';
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await User.deleteMany({});
});

test('register -> returns token', async () => {
  const res = await request(app).post('/auth/register').send({ name: 'Test', email: 't@example.com', password: 'pass1234' }).expect(200);
  expect(res.body.token).toBeDefined();
});

test('login -> returns token', async () => {
  await request(app).post('/auth/register').send({ name: 'Test', email: 't@example.com', password: 'pass1234' }).expect(200);
  const res = await request(app).post('/auth/login').send({ email: 't@example.com', password: 'pass1234' }).expect(200);
  expect(res.body.token).toBeDefined();
});

// Note: google endpoint test requires mocking google auth library or using a real id_token
// We'll just assert that missing idToken returns 400
test('google -> missing idToken returns 400', async () => {
  await request(app).post('/auth/google').send({}).expect(400);
});
