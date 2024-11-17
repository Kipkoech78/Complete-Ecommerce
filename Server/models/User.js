const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
    },
});
const  User = mongoose.model('User', usersSchema);
// const User = mongoose.model('User', userSchema);
module.exports = User;

// const userSchema = new mongoose.Schema({
//     username : {
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     password: {
//         type: String,
//     },
//     role: {
//         type: String,
//         default: 'user',
        
//     },
// });

