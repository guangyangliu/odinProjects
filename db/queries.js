const pool = require('./pool');

async function getAllMessages () {
    const {rows} = await pool.query('SELECT * FROM messages;');
    return rows;
}


async function addMessage (text,name) {
    const sql = `INSERT INTO messages (text, name, added) VALUES ($1, $2, $3)`;
    const values = [text, name, new Date()];
    await pool.query(sql,values);
}


module.exports = {
    getAllMessages,
    addMessage
}