const mongoose = require('mongoose');
var url = "mongodb+srv://lehuukien2002:i6DMZ0UVGFziuxb4@cluster0.jztuunn.mongodb.net/database4?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connect USER for MongoDB");
    })
    .catch((err) => {
        throw err;
    });


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: { type: String },
    username: { type: String },
    password: { type: String },
    phone: { type: String },
    role: { type: String }
}, { collection: 'Users' });

module.exports = mongoose.model('Users', UserSchema);