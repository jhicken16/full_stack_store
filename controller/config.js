require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    DB: {
        PGHOST: process.env.PGHOST,
        PGUSER: process.env.PGUSER,
        PGPORT: process.env.PGPORT,
        PGPASSWORD: process.env.PGPASSWORD,
        PGDATABASE: process.env.PGDATABASE
    },
    SESSION_KEY: process.env.SESSION,
    G: {
        CLIENTID: process.env.GCLIENTID,
        CLIENTSECRET: process.env.GCLIENTSECRET
    },
    STRIPE: {
        PUBLIC: process.env.STRIPEPUBLIC,
        SECRETE: process.env.STRIPESECRET
    }

}