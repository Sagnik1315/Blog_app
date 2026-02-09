"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import BlogEditor from "@/Components/BlogEditor"; // ✅ import editor

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    content: "",   // ✅ detailed blog section
    author: "Anusuya",
    author_img: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("content", data.content);   // ✅ include editor content
    formData.append("author", data.author);
    formData.append("authorimg", data.author_img);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.msg) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          description: "",
          category: "Startup",
          content: "",
          author: "Anusuya",
          author_img: "/author_img.png",
        });
      } else {
        toast.error(response.status);
      }
    } catch (error) {
      toast.error("Error uploading blog");
    }
  };

  return (
    <div className="justify-center mx-auto max-w-7xl">
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16 mx-auto">
      <p className="text-xl">Upload Thumbnail</p>
      <label htmlFor="image">
        <Image
          className="mt-4"
          src={!image ? assets.upload_area : URL.createObjectURL(image)}
          width={140}
          height={70}
          alt=""
        />
      </label>
      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        id="image"
        hidden
        required
      />

      <p className="text-xl mt-4"> Blog Title </p>
      <input
        name="title"
        onChange={onChangeHandler}
        value={data.title}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        placeholder="Type Here "
        required
      />

      <p className="text-xl mt-4"> Blog Description </p>
      <textarea
        name="description"
        onChange={onChangeHandler}
        value={data.description}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="Write content Here "
        rows={6}
        required
      />

      <p className="text-xl mt-4">Blog Category</p>
      <select
        name="category"
        onChange={onChangeHandler}
        value={data.category}
        className="w-40 mt-4 px-4 py-3 border text-gray-500"
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      {/* ✅ Detailed Blog Section */}
      <p className="text-xl mt-6">Detailed Blog Content</p>
      <BlogEditor
        value={data.content}
        onChange={(content) => setData((d) => ({ ...d, content }))}
        className="mx-auto"
      />

      <button type="Submit" className="mt-8 w-40 h-12 bg-black text-white">
        ADD
      </button>
    </form>
    </div>
  );
};

export default page;
