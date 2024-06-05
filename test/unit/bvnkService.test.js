const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const Hawk = require('hawk');
const bvnkService = require('../../src/services/bvnkService');

const mock = new MockAdapter(axios);

describe('BVNKService', () => {
  it('should create a transaction successfully', async () => {
    const fiatAmount = 1000;
    const cryptoType = 'BTC';
    const response = { id: '123', fiatAmount, cryptoType };

    const url = 'https://api.sandbox.bvnk.com/api/v1/transactions';
    const method = 'POST';
    const hawkHeader = Hawk.client.header(url, method, {
      credentials: {
        id: process.env.BVNK_API_KEY_ID,
        key: process.env.BVNK_API_KEY,
        algorithm: 'sha256',
      },
    }).header;

    mock.onPost(url).reply(200, response);

    const result = await bvnkService.createTransaction(fiatAmount, cryptoType);

    expect(result).toEqual(response);
    expect(mock.history.post[0].headers.Authorization).toEqual(hawkHeader);
  });

  it('should throw an error when the transaction creation fails', async () => {
    const url = 'https://api.sandbox.bvnk.com/api/v1/transactions';

    mock.onPost(url).reply(500);

    await expect(bvnkService.createTransaction(1000, 'BTC')).rejects.toThrow('Error creating transaction');
  });
});
