import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
const getpostswithtag = async (id) => {
  const posts = await prisma.posts.findMany({
    where: {
      tags: {
        contains: id,
      },
    },
    orderBy: {
      creation_date: "desc",
    },
  });
  return posts;
};


async function hello({ params }) {
  const posts = await getpostswithtag(params.id);
  return (
    <div>
      <div className="bg-gray-100 p-4 mb-2">
        <ul className="list-outside">
          {posts.map((post) => (
            <Link href="/posts/[id]" as={`/posts/${post.id}`} key={post.id}>
              <li className="bg-white border border-gray-300 rounded p-4 mb-4 hover:shadow-md cursor-pointer">
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  {post.title || "Mystery question"}
                </h2>
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
