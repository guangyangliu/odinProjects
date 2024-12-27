const { query } = require('express');
const model = require('./model');
const bcrypt = require('bcryptjs');

exports.createUser = async (username, password, first_name, last_name) => {
    const hash = await bcrypt.hash(password, 10);
    const result =  await model.query(`INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *`, [username, hash, first_name, last_name]);
    return result.rows[0];
};

exports.changeStatus = async (username, membership, admin) => {
    await model.query(`UPDATE users SET membership = $1, admin = $2 WHERE username = $3`, [membership, admin, username]);
};


exports.getUserByUsername = async (username) => {
    const result = await model.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return result.rows[0];
}

exports.getUserById = async (userId) => {
    const result = await model.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    return result.rows[0];
}

exports.createPost = async (username, title, text) => {
    await model.query(`INSERT INTO messages (username, title, text) VALUES ($1, $2, $3)`, [username, title, text]);
}

exports.getMessages = async () => {
    const result = await model.query(`SELECT messages.id, messages.title, messages.text, users.first_name, users.last_name FROM messages JOIN users ON messages.username = users.username`);
    return result.rows;
}

exports.deleteMessage = async (id) => {
    await model.query(`DELETE FROM messages WHERE id = $1`, [id]);
}