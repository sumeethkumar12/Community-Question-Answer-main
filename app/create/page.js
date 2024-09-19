import React from "react";
import AddPost from "./AddPost";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

async function getUser() {
  const nextCookies = cookies();
  const token = nextCookies.get("token");
  return token;
}

export default async function create() {
  const user = await getUser();

  return (
    <div className="p-4 bg-gray-100">
      {user ? (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="font-bold text-lg mb-2">
            Logged in as {user.value}
          </div>
          <AddPost userid={user.value} />
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="font-bold text-lg mb-2">Not logged in</div>
          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login to Add Post
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
