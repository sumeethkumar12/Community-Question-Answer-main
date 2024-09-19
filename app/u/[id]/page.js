import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
const getpostsofuser = async (id) => {
  const posts = await prisma.posts.findMany({
    where: {
      owner_user_id: parseInt(id),
      post_type_id: 1,
    },
  });
  return posts;
};


async function hello({ params }) {
  const posts = await getpostsofuser(params.id);
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Posts</h1>
        {posts.length === 0 ? (
          <div className="flex flex-wrap">
          <div className="rounded p-4 mb-4">
            <p className="text-gray-600">No posts yet</p>
          </div>
          <Link href="/create">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-6 mt-3">
              Create a post
            </button>
          </Link>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 rounded p-4 mb-4">
            <p className="text-gray-600">Posts</p>
          </div>
        )}
        <div className="bg-gray-100 p-4 mb-2">
          <ul className="list-outside">
            {posts.map((post) => (
              <Link href="/posts/[id]" as={`/posts/${post.id}`} key={post.id}>
                <li className="bg-white border border-gray-300 rounded p-4 mb-4 hover:shadow-md cursor-pointer">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold text-gray-700 mb-2">
                      {post.title || "Mystery question"}
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    <Link
                      href="/profile/[id]"
                      as={`/profile/${post.owner_user_id}`}
                    >
                      Author : {post.owner_display_name || "Anonymous"}
                    </Link>
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  } 

export default hello;
