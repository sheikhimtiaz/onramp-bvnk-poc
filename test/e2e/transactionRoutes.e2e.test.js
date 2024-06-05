const request = require('supertest');
const app = require('../../src/app');
const bvnkService = require('../../src/services/bvnkService');

jest.mock('../../src/services/bvnkService');

describe('Transaction Routes', () => {
  it('should create a transaction', async () => {
    const transaction = { id: '123', fiatAmount: 1000, cryptoType: 'BTC' };
    bvnkService.createTransaction.mockResolvedValue(transaction);

    const res = await request(app)
      .post('/api/v1/transactions')
      .send({ fiatAmount: 1000, cryptoType: 'BTC' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(transaction);
  });

  it('should handle errors when creating a transaction', async () => {
    bvnkService.createTransaction.mockRejectedValue(new Error('Error creating transaction'));

    const res = await request(app)
      .post('/api/v1/transactions')
      .send({ fiatAmount: 1000, cryptoType: 'BTC' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Error creating transaction' });
  });
});
