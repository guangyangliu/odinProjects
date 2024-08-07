const {Client} = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS model (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255),
    model VARCHAR (255),
    price INTEGER,
    quantity INTEGER,
    UNIQUE (name, model)
);

DROP TABLE IF EXISTS category;

CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) UNIQUE,
    type VARCHAR (255) NOT NULL,
    image TEXT NOT NULL,
    UNIQUE (name, type)
);

INSERT INTO category (name, type, image) 
VALUES 
    ('X1', 'SUV', 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331c9Nv2Z7d5yKlHS9fxQun%25P6yn17sYhuMwWhRsSFUi59dYmyGZI0EPyAR2XOuADyeJNwSFqIbusKpzL3hZtUDvkiaKM4lxvpa2CpLYkjUPox4qSN0enMA8mzxAQ53HtHkJE%25Z8XZDKoOILB9LxSSCJdoecId4dwd9DBDMztijUeqhk7ZfHMLoACRV4hJHFl5Wtou%25KXhBjHSfWQoOz%25V1PaH6LfNEbn%25xG10s9OfRzE4riIXUSscZwBQGwrxRteapJZ857MnseRUgChDYC5GvloTWggp2XH3Ibv6jQ%25mp22YIPwZAswT2mxuhJPvOjhwmzqIb%25snvzqc1QpD06JdoLrNJjuMw%25RBDFhSaP059C3svlb4x8NF1bOayjn65efyu'),
    ('X2', 'SUV', 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331c9Nv2Z7d5yKlHS9fxQun%25P6yn17sYhuMwWhRsSFUi59dYmyGZI0EPyAR2XOuADyeJNwSFqIbusK0wL3hZtUDvkiaKM4lxvpa2CpLYkjUPox4qSN0enMA8mzxBQ53HtHkJE%25Z8XZDKoOILB9LxvSCJdoecId4dwdGQBDMztiaeeqhk7wDnMLoACR1%25hJHFl5t3ou%25KXgB1HSfWQvho%25V1Pa2tUfNEbnjiX10s9OfoJE4riI14UscZwBEhWrxRtesL%25Z857Mrd0RUgChZSR5GvloImVgp2XHBRov6jQ%25Jby2YDafu3ajmqn1SuIDyLOEAwqqTMiCgWRCzq3GN%25ViDeL%25C3FuMwERBDFuUrOmJxyVAfS5cVLNHCEvhJP%250Iix2tQkRDaw8GpcPrweIdLBy2osdN'),
    ('3', 'Sedan', 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331c9Nv2Z7d5yKlHS9fxQun%25P6yn17sYhuMwWhRsSFUi59dYmyGZI0EPyAR2XOuADyeJNwSFqIbusKTDL3hZtUDvkiaKM4lxvpa2CpLYkjUPox4qSN0enMA8mzR2Q53HtHkJE%25Z8XZDKoOILB9LxnSCJdoecId4dwdGbBDMztzpaeqhk7kPZMLoACtqwhJHFl7TQou%25KXgs1HSfWQvCz%25V1Pa2cNfNEbnjiX10s9Of56E4riI14uscZwBEcHrxRtesoPZ857MrNRRUgChZu15GvloRkdgp2XH5Icv6jQ%25g0v2YDafMYUjmqn1hVGDyLOEozOqTJIsNtzL3uBr0ABJdSeZ4FCuzVMRcXySkNh5xcHVA0og8YcNF4HvUwH0Kc%252wn44WsaBuCLB94Pdp5Ga0Ec5BPt8sn2L10t83D%25FxyKGwgUJmGcpRB2Srxl56fayVOhiL0onTdzmlDnEfbc1KVZjbp');
`
async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.connectionString
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();