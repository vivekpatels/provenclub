// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {

       const conn = await mongoose.connect("mongodb://localhost:27017/library");
       console.log(conn.connection);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}

module.exports = {connectDB}