import supertest from 'supertest';
import index from '../../index';

const request = require('supertest');

describe('POST /cart', () => {
  describe('adding an item to the cart', async () => {
    const response = await request(index).post('/createCart').send({
      itemName: 'Product 1',
      type: 'Electronics',
      quantity: 2,
      supplierId: 'supplier123',
      price: 49.99,
      description: 'A high-quality electronic product with advanced features.',
    });
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /getCart', () => {
  describe('get cart items', async () => {
    const response = await request(index).post('/createCart').send({});
    expect(response.statusCode).toBe(200);
  });
});

describe('DELETE /deleteItem/652d461a4b9c41b337cdcd0b', () => {
  describe('adding an item to the cart', async () => {
    const response = await request(index).post('/createCart').send({});
    expect(response.statusCode).toBe(200);
  });
});

describe('PUT /deleteItem/652d461a4b9c41b337cdcd0b', () => {
  describe('adding an item to the cart', async () => {
    const response = await request(index).post('/createCart').send({
      type: 'Clothing',
    });
    expect(response.statusCode).toBe(200);
  });
});
