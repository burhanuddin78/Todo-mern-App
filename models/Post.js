
//  create Schema For todo as Post

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
   
    description: {
      type: String,
      required: true,
      
    },
  
    complete: {
      type: Boolean,
      default: false
    },
    date: {
        type: Date,
        default: Date.now,
      },
    
 } )

 module.exports = Post = mongoose.model('post', PostSchema);