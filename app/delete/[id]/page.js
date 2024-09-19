import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
async function page({ params }) {
  const result = await prisma.posts.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Post Deleted</h1>
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-6 mt-3">
            Go Home
        </button>
        </Link>
        

    </div>
  );
}

export default page;
