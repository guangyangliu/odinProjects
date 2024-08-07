const pool = require('./pool');

async function getCategory() {
    const {rows} = await pool.query(`SELECT DISTINCT type FROM category`);
    return rows;
}

async function getAllcarInfo() {
    const {rows} = await pool.query(`SELECT name, type,image FROM category ORDER BY name ASC`);
    return rows;
}

async function getDetail(name) {
    const {rows} = await pool.query(`SELECT * FROM model WHERE name = $1`, [name]);
    return rows;
}


async function getImg(name) {
    const {rows} = await pool.query(`SELECT image FROM category WHERE name = $1`, [name]);
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



async function createCategory(name, type, img) {
    const sql = `INSERT INTO category (name,type, image) VALUES ($1, $2, $3)
    ON CONFLICT (name) DO NOTHING`;
    const value = [name,type, img];
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
    getAllcarInfo,
    createModel,
    getAllCarName,
    getDetail,
    getImg
}