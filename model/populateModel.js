const { Client } = require('pg');
require('dotenv').config();

const sql = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        membership BOOLEAN NOT NULL DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        time TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (username) REFERENCES users (username)
    );
`;


async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(sql);
    await client.end();
    console.log("done");
  }
  
  main();  