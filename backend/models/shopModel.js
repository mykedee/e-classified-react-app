
const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
 name: {
  type: String,
 },
 about: {
  type: String,
 },
 location: {
  type: String,
 },
 photo: {
  type: String,
 },
 owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',

 },

}
);



module.exports = mongoose.model('Shop', shopSchema);
