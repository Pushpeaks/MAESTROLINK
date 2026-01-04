const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Contact = require('../models/Contact');

beforeAll(async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/maestrolink_test';
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await Contact.deleteMany({});
});

test('POST /contact -> 400 when missing fields', async () => {
  await request(app).post('/contact').send({}).expect(400);
});

test('POST /contact -> 200 and saved', async () => {
  const payload = { name: 'Alice', email: 'a@example.com', message: 'Hello' };
  const res = await request(app).post('/contact').send(payload).expect(200);
  expect(res.body.ok).toBe(true);
  const saved = await Contact.findOne({ email: 'a@example.com' });
  expect(saved).toBeTruthy();
  expect(saved.message).toBe('Hello');
});