const express = require('express')
const { PORT } = require('./controller/config')

const loaders = require('./controller/loaders')

const app = express()

loaders(app)

app.listen(PORT, () => {
    console.log(`Server running on prot: ${PORT}`)
})