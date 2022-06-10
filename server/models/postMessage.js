import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String, 
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String, //converting image into string using base64
  likes: { 
    type: [String],
    default: []
  },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const PostMessage = mongoose.model('PostMessage', postSchema); //takes (name_of_model, name_of_schema)

export default PostMessage; 