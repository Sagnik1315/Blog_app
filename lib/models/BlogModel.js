// import mongoose from "mongoose";

// const Schema =  new mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     category:{
//         type:String,
//         required:true
//     },
//     author:{
//         type:String,
//         required:true
//     },
//     image:{
//         type:String,
//         required:true
//     },
//     authorImage:{
//         type:String,
//         required:true
//     },
//     date:{
//         type:Date,
//         default:Date.now() //shows the current date 
//     }
    

// })

// const BlogModel = mongoose.models.blog || mongoose.model('blog' , Schema)

// export default BlogModel;


import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String, // short summary
    required: true,
  },
  content: {
    type: String, // full blog content from TipTap (HTML)
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String, // ✅ Cloudinary URL
    required: true,
  },
  imagePublicId: {
    type: String, // ✅ Cloudinary public_id
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite on hot reload
const BlogModel = mongoose.models.blog || mongoose.model("blog", Schema);

export default BlogModel;
