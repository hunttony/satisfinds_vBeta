// uniqueId.js

const { v4: uuidv4 } = require('uuid');

const generateUniqueId = () => {
  // Generate a UUID (v4)
  return uuidv4();
};

module.exports = generateUniqueId;
