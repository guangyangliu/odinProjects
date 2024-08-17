const model = require('./model');
const bcrypt = require('bcryptjs');

const createUser = async (username, password, first_name, last_name) => {
    const hash = await bcrypt.hash(password, 10);
    await model.query(`INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *`, [username, hash, first_name, last_name]);
};

module.exports = {createUser};