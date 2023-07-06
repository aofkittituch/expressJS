const mongoose = require('mongoose');
const conn = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/roitai');
        console.log('Database connected');
    } catch (err) {
        console.log(err);
    }
};

module.exports = conn;