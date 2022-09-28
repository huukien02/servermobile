const mongoose = require('mongoose');
var url = "mongodb+srv://lehuukien2002:i6DMZ0UVGFziuxb4@cluster0.jztuunn.mongodb.net/database4?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connect PRODUCT for MongoDB");
    })
    .catch((err) => {
        throw err;
    });


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    name: { type: String },
    price: { type: String },
    image: { type: String },
    detail: { type: String }
}, { collection: 'Product' });

module.exports = mongoose.model('Product', ProductSchema);