const { NextResponse } = require("next/server")
import {ConnectDB} from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
import { log } from "console";
import {writeFile} from 'fs/promises'
import cloudinary from "@/lib/config/cloudinary";
import { Content } from "next/font/google";

const fs= require('fs')
// import { title } from "process";
const LoadDB =async()=>{
    await ConnectDB();
}
LoadDB();



//to get of blog
export async function GET(request) {
    const blogId =request.nextUrl.searchParams.get("id")
    
     if(blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog)
    }
    else{
        const blogs= await BlogModel.find({});
        return NextResponse.json({blogs})
    }
}
//Api Endpoint for uplod the blog

// export async function POST(request) {
//     const formData = await request.formData();
//     const timestamp = Date.now();
//     // console.log("from route",formData)
//     const image =formData.get('image');
//     const imageByteData= await image.arrayBuffer();

//     const buffer = Buffer.from(imageByteData);
//     const path = `./public/${timestamp}_${image.name}`
//     await writeFile(path, buffer);
//     const imgUrl=`/${timestamp}_${image.name}`
//     console.log("FormData", formData)

    
//   title: formData.get("title"),
//   description: formData.get("description"),
//   category: formData.get("category"),
//   author: formData.get("author"),
//   image: imgUrl,
//   authorImage: formData.get("authorimg"), // ✅ match schema exactly
// };
//     await BlogModel .create(blogData);
    
//     return NextResponse.json({success:true,msg:'Blog Added'})
// }


//     const blogData = {

//Createing api to delet file

export async function POST(request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image");
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    // Convert to base64 so Cloudinary can accept it
    const base64Image = `data:${image.type};base64,${imageBuffer.toString("base64")}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "blogs", // optional folder in cloudinary
    });

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      content: formData.get("content"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: uploadResponse.secure_url, // ✅ Cloudinary CDN link
      imagePublicId : uploadResponse.public_id,
      authorImage: formData.get("authorimg"),
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error uploading blog:", error);
    return NextResponse.json({ success: false, msg: "Error uploading blog" }, { status: 500 });
  }
}

// export async function DELETE(request) {
//     const id =await request.nextUrl.searchParams.get('id');
//     const blog =await BlogModel.findById(id)
//     fs.unlink(`./public ${blog.image}`,()=>{})
//     await BlogModel.findByIdAndDelete(id);
//     return NextResponse.json({msg:"Blog Deleted"})
// }

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // 🔹 Delete image from Cloudinary
    // if (blog.imagePublicId) {
    //   await cloudinary.uploader.destroy(blog.imagePublicId);
    // }

    // ✅ Delete image from Cloudinary
    if (blog.imagePublicId) {
      const result = await cloudinary.uploader.destroy(blog.imagePublicId);
      console.log("Cloudinary delete result:", result); // check if it says "not found" or "deleted"
    }

    // 🔹 Delete blog from DB
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ msg: "Blog and image deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}