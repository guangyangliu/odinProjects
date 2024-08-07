const pool = require('./pool');

async function getCategory() {
    const {rows} = await pool.query(`SELECT DISTINCT type FROM category`);
    return rows;
}

async function getAllCarName() {
    const {rows} = await pool.query(`SELECT name FROM category ORDER BY name ASC`);
    return rows;
}

async function getCarName(carType) {
    const {rows} = await pool.query(`SELECT name FROM category WHERE type = $1`, [carType]);
    return rows;
}



async function createCategory(name, type) {
    const sql = `INSERT INTO category (name,type) VALUES ($1, $2)
    ON CONFLICT (name) DO NOTHING`;
    const value = [name,type];
    await pool.query(sql, value);
}

async function createModel(name, model, price, quantity) {
    const sql = `INSERT INTO model (name, model, price, quantity) VALUES ($1, $2, $3, $4)
    ON CONFLICT (name, model) DO NOTHING`;
    const value = [name, model, price, quantity];
    await pool.query(sql, value);
}


module.exports = {
    getCategory,
    getCarName,
    createCategory,
    getAllCarName,
    createModel
}