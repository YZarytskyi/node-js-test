const {mongoose} = require('mongoose')

const app = require('./index')

const DB_HOST = 'mongodb+srv://Yurii:9kKJya6xLmwWgDrW@cluster0.yty0ac0.mongodb.net/contacts_reader?retryWrites=true&w=majority'
const PORT = 3000;

mongoose.connect(DB_HOST)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT)
    })
    .catch((error) => {
        console.log(error.message)
        process.exit(1)
    })