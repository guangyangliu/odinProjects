const model = require('./model');
const bcrypt = require('bcryptjs');

exports.createUser = async (username, password, first_name, last_name) => {
    const hash = await bcrypt.hash(password, 10);
    await model.query(`INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *`, [username, hash, first_name, last_name]);
};

exports.changeMembership = async (username) => {
    await model.query(`UPDATE users SET membership =  true WHERE username = $1`, [username]);
};


exports.getUserByUsername = async (username) => {
    const result = await model.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return result.rows[0];
}

exports.getUserById = async (userId) => {
    const result = await model.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return result.rows[0];
}