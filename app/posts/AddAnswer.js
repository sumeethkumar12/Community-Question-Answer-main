"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Addanswer({ postID ,userID}) {
  const [answer, setanswer] = useState("");
  const router = useRouter();
  const postidnum = parseInt(postID);
  
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const body = { postidnum, answer ,userID };
      await fetch("/api/post/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    router.refresh();
  };

  return (
    <section className="bg-white light:bg-gray-900 py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6"></div>
        <form className="mb-6" onSubmit={submitData}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 light:bg-gray-800 light:border-gray-700">
            <label htmlFor="answer" className="sr-only">
              Your answer
            </label>
            <textarea
              id="answer"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none light:text-white light:placeholder-gray-400 light:bg-gray-800"
              placeholder="Write a answer..."
              required
              defaultValue={""}
              onChange={(e) => setanswer(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 light:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post answer
          </button>
        </form>
      </div>
    </section>
  );
}

export default Addanswer;
