require('dotenv').config();
const { Client } = require('pg');

const message = {
  text: 'Hello World!',
  name: 'Odin',
  added: new Date()
};

const createTableQuery = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  text VARCHAR (255),
  name VARCHAR (255),
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const insertQuery = `
INSERT INTO messages (text, name, added) 
VALUES ($1, $2, $3);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.URL
    });
    await client.connect();
    await client.query(createTableQuery);
    await client.query(insertQuery,[message.text, message.name, message.added]);
    await client.end();
    console.log("done");
  }

main();
