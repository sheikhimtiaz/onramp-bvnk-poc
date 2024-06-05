const bvnkService = require('../../src/services/bvnkService');
const { createTransaction } = require('../../src/controllers/transactionController');

jest.mock('../../src/services/bvnkService');

describe('Transaction Controller', () => {
  it('should create a transaction and return 201 status', async () => {
    const req = { body: { fiatAmount: 1000, cryptoType: 'BTC' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const transaction = { id: '123', fiatAmount: 1000, cryptoType: 'BTC' };

    bvnkService.createTransaction.mockResolvedValue(transaction);

    await createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(transaction);
  });

  it('should handle errors and return 500 status', async () => {
    const req = { body: { fiatAmount: 1000, cryptoType: 'BTC' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    bvnkService.createTransaction.mockRejectedValue(new Error('Error creating transaction'));

    await createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error creating transaction' });
  });
});
