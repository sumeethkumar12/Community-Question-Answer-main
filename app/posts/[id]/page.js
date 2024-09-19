import { PrismaClient } from "@prisma/client";
import Addanswer from "../AddAnswer";
import { cookies } from "next/headers";
import Link from "next/link";

const prisma = new PrismaClient();
async function getPostAnsers(postID) {
  const post = prisma.posts.findMany({
    where: {
      post_type_id: 2,
      parent_id: parseInt(postID, 10),
    },
    orderBy: {
      creation_date: "desc",
    },
  });
  post.then((data) => console.log(data));
  return post;
}
async function getPost(postID) {
  const post = prisma.posts.findUnique({
    where: {
      id: parseInt(postID, 10),
    },
  });
  return post;
}
async function getUser() {
  const nextCookies = cookies();
  const token = nextCookies.get("token");
  return token;
}


export default async function listPost({ params }) {
  const Answers = await getPostAnsers(params.id);
  const post = await getPost(params.id);
  const user = await getUser();
  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Question</h1>
        <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        <div className="flex flex-wrap ">
          <p className="text-gray-600 font-bold">Score : {post.score}</p>
          <p className="text-gray-600 ml-6 font-bold">
            {" "}
            Views : {post.view_count}
          </p>
          <p className="text-gray-600 ml-6 font-bold">
            <Link href="/profile/[id]" as={`/profile/${post.owner_user_id}`}>
              Author : {post.owner_display_name || "Anonymous"}
            </Link>
          </p>
          {post.owner_user_id == user.value ? (
            <div className="flex">
              <Link href={`/edit/${post.id}`}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-3 rounded ml-6 transition-colors duration-200 ease-in-out border border-blue-500"
                  type="button"
                >
                  Edit Post
                </button>
              </Link>
              <Link href={`/delete/${post.id}`}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-3 rounded ml-6 transition-colors duration-200 ease-in-out border border-blue-500"
                  type="button"
                >
                  Delete Post
                </button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-wrap mt-2">
          {post.tags
            ?.split("<")
            .filter(Boolean)
            .map((element) => element.slice(0, -1))
            .map((tag) => (
              <a
                key={tag.id}
                href={`/p/${tag}`}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                #{tag}
              </a>
            ))}
        </div>

        <h1 className="text-3xl font-bold mt-6 mb-4">Answers</h1>
        {user ? (
          <>
            <Addanswer postID={params.id} userID={user.value} />
          </>
        ) : (
          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
              Login to Add Answer
            </button>
          </Link>
        )}
        <ul className="list-disc list-outside mb-4">
          {Answers.map((Answer) => (
            <>
              <li
                key={Answer.id}
                className="prose "
                dangerouslySetInnerHTML={{ __html: Answer.body }}
              />
              <div className="flex flex-wrap mt-2">
                <p className="text-gray-600 font-bold">
                  Score : {Answer.score}
                </p>
                <p className="text-gray-600 ml-16 font-bold">
                  <Link
                    href="/profile/[id]"
                    as={`/profile/${Answer.owner_user_id}`}
                  >
                    Author : {Answer.owner_display_name || "Anonymous"}
                  </Link>
                </p>
              </div>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
