require('dotenv').config();

const config = {
  bvnkApiKey: process.env.BVNK_API_KEY,
  bvnkApiKeyId: process.env.BVNK_API_KEY_ID,
  port: process.env.PORT || 3000,
};

module.exports = config;
