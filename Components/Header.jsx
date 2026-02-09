import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    try {
      const response = await axios.post("/api/email", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error subscribing.");
      }
    } catch (err) {
      toast.error("Server error.");
    }
  };

  return (
    <header className="py-6 px-5 md:px-12 lg:px-28 bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Top Nav */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <Image
          src={assets.logo}
          width={180}
          alt="Logo"
          className="w-[130px] sm:w-auto"
        />

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border border-black shadow-[-5px_5px_0px_#000] transition">
            Get Started
            <Image src={assets.arrow} alt="Arrow" className="w-4 h-4" />
          </button>

          <Link
            href="/admin"
            className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border border-black shadow-[-5px_5px_0px_#000] transition"
          >
            Admin
            <Image src={assets.arrow} alt="Arrow" className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mt-12 sm:mt-16">
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
          Latest Blogs
        </h1>
        <p className="mt-6 sm:mt-10 max-w-xl mx-auto text-sm sm:text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda,
          molestias. Impedit distinctio dolores non aspernatur, quam nulla
          voluptate quasi ab sit dicta sed aliquid suscipit eius doloremque.
          Nobis, perferendis consectetur!
        </p>

        {/* Email Subscription */}
        <form
          onSubmit={onSubmitHandler}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center max-w-md mx-auto border border-black shadow-[-5px_5px_0px_#000] overflow-hidden rounded"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 sm:py-4 outline-none text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            className="bg-black text-white font-medium px-4 sm:px-8 py-3 sm:py-4 hover:bg-gray-800 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
