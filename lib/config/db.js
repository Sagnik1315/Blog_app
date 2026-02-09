// // import mongoose from "mongoose";
// const { default: mongoose } = require("mongoose")

// export const ConnectDB = async () => {
//     // await mongoose.connect('mongodb+srv://Anusuya:AAiuqj@Gsb5bgX8@cluster0.xh9pota.mongodb.net/blog-app')
// //    await mongoose.connect ('mongodb+srv://palanusuya2005:vNkWYh54lb1Hqii7@cluster0.zsjbrdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

// //    await mongoose.connect ('mongodb+srv://sagnikbanerjee12345:um8pVXI99kC1JyIL@next-blog-app.cb4qkiu.mongodb.net/?retryWrites=true&w=majority&appName=next-blog-app')
    
//       await mongoose.connect('mongodb+srv://Anusuya:AAiuqj@Gsb5bgX8@NEXT_BLOG_APP.xh9pota.mongodb.net/?retryWrites=true&w=majority&appName=NEXT_BLOG_APP')

//    console.log("data base connected")
// }


// new 

const { default: mongoose } = require("mongoose");

export const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sagnikbanerjee12345:<db_password>@next-blog-app.cb4qkiu.mongodb.net/?appName=next-blog-app"
    );
    console.log("Database connected ✅");
  } catch (error) {
    console.error("Database connection failed ❌", error);
  }
};
