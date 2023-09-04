const express = require("express");
const cors = require("cors");
const contactsRouter = require("./routes/contacts");

const app = express()

const PORT = 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/contacts', contactsRouter)

app.use((req, res) => {
    res.status(404).json({message: "Not found"})
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message: message });
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})

module.exports = app