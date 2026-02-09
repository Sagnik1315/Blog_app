import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-6px_6px_0px_#000000] transition-all duration-300">
      {/* Image */}
      <Link href={`/blogs/${id}`} className="block">
        <div className="w-full h-[180px] overflow-hidden border-b border-black">
          <Image
            src={image}
            alt={title}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="inline-block mb-3 px-3 py-1 bg-black text-white text-xs font-medium rounded">
          {category}
        </span>

        {/* Title */}
        <h5 className="mb-1 text-lg font-bold text-gray-900 line-clamp-2">
          {title}
        </h5>

        {/* Short description */}
        <p
          className="mb-4 text-sm text-gray-700 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>

        {/* Read more */}
        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center font-semibold text-black hover:underline"
        >
          Read more
          <Image src={assets.arrow} alt="" className="ml-2" width={12} />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
