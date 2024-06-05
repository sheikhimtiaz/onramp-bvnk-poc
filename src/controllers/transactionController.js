const bvnkService = require('../services/bvnkService');

const createTransaction = async (req, res) => {
  const { fiatAmount, cryptoType } = req.body;
  try {
    const transaction = await bvnkService.createTransaction(fiatAmount, cryptoType);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTransaction };
