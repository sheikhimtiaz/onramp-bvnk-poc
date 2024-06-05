const axios = require('axios');
const Hawk = require('hawk');
const config = require('../config/config');

class BVNKService {
  constructor() {
    this.credentials = {
      id: config.bvnkApiKeyId, // Updated to use API Key ID
      key: config.bvnkApiKey,
      algorithm: 'sha256',
    };
  }

  generateHawkHeader(url, method) {
    const { header } = Hawk.client.header(url, method, { credentials: this.credentials });
    return header;
  }

  async createTransaction(fiatAmount, cryptoType) {
    const url = 'https://api.sandbox.bvnk.com/api/v1/transactions';
    const method = 'POST';
    const headers = { Authorization: this.generateHawkHeader(url, method) };

    try {
      const response = await axios.post(url, { fiatAmount, cryptoType }, { headers });
      return response.data;
    } catch (error) {
      throw new Error('Error creating transaction');
    }
  }
}

module.exports = new BVNKService();
