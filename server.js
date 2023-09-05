const {mongoose} = require('mongoose')

const app = require('./index')

const {DB_HOST, PORT} = process.env

mongoose.connect(DB_HOST)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT)
    })
    .catch((error) => {
        console.log(error.message)
        process.exit(1)
    })