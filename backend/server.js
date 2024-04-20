const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./config/db.js')

const getAllBooks = require('./routes/booksRoutes.js')
const app = express();

connectDB()
app.use(cors())
app.use(express.json());


app.use('/api', getAllBooks)


// const PORT = process.env.PORT;

app.listen(4000, () => {
    console.log(`Server Running on Port ${PORT}`);
})