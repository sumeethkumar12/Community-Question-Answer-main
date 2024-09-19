"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function EditPost({ params }) {
  const [title, settitle] = useState("");
  const [text, settext] = useState("");
  const [tags, settags] = useState([]);
  const [tagstext, settagstext] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const str = selectedTags.map((element) => `<${element.tag_name}>`).join("");
  console.log(str);
  const router = useRouter();


  const handleChange = async (e) => {
    e.preventDefault();
    settagstext(e.target.value);
    if (tagstext.length > 0) {
      try {
        const body = { tagstext };
        const data = await fetch("/api/search/tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const result = await data.json();
        settags(result);
        console.log(tags);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const postID = params.id
      const body = { title, text, str ,postID};
      await fetch("/api/post/updatepost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    router.push("/posts");
  };

  return (
    <section className="bg-white light:bg-gray-900 py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6"></div>
        <form className="mb-6" onSubmit={submitData}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 light:bg-gray-800 light:border-gray-700">
            <label htmlFor="title" className="sr-only">
              Your title
            </label>
            <textarea
              id="title"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none light:text-white light:placeholder-gray-400 light:bg-gray-800 h-5"
              placeholder="Write a title..."
              required
              defaultValue={""}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 light:bg-gray-800 light:border-gray-700 h-40">
            <label htmlFor="title" className="sr-only">
              Your Text
            </label>
            <textarea
              id="title"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none light:text-white light:placeholder-gray-400 light:bg-gray-800 h-35"
              placeholder="Write a text article..."
              required
              defaultValue={""}
              onChange={(e) => settext(e.target.value)}
            />
          </div>
          <input
            type="text"
            value={tagstext}
            onChange={handleChange}
            className="block w-full p-2 sm:p-4 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add tags to your post..."
            required
          />
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              Tags :
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <a
                  key={tag.id}
                  style={{
                    backgroundColor: selectedTags.includes(tag)
                      ? "green"
                      : "#f1f1f1",
                    borderRadius: "10px",
                    padding: "5px 10px",
                    marginRight: "10px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag.tag_name}
                </a>
              ))}
            </div>
          </div>
          {selectedTags.length > 0 && (
            <div>
              <h1
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                Selected Tags :
              </h1>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selectedTags.map((tag) => (
                  <a
                    key={tag.id}
                    style={{
                      backgroundColor: "green",
                      borderRadius: "10px",
                      padding: "5px 10px",
                      marginRight: "10px",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {tag.tag_name}
                  </a>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 light:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditPost;
