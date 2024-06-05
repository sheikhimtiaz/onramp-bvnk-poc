const express = require('express');
const { createTransaction } = require('../controllers/transactionController');

const router = express.Router();

router.post('/api/v1/transactions', createTransaction);

module.exports = router;
