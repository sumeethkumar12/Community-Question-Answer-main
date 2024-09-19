"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

function Search() {
  const [tagstext, setTagstext] = useState("");
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const handleChange = async (e) => {
    e.preventDefault();
    setTagstext(e.target.value);
    if (tagstext.length > 1) {
      try {
        const body = { tagstext };
        const data = await fetch("/api/search/tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const result = await data.json();
        setTags(result);
        console.log(tags);

        const body2 = { tagstext };
        const data2 = await fetch("/api/search/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body2),
        });
        const result2 = await data2.json();
        setUsers(result2);
        console.log(users);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form className="relative flex items-center mx-auto max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
        <input
          type="text"
          value={tagstext}
          onChange={handleChange}
          className="block w-full p-2 sm:p-4 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Posts"
          required
        />
        <button
        onClick={()=>{router.push("/create")}}
          className="text-white bg-blue-700 w-25 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 sm:ml-4"
        >
          Create new Post
        </button>
      </form>
      {tagstext.length > 0 && (
        <>
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
                  href={`/p/${tag.tag_name}`}
                  style={{
                    backgroundColor: "#f1f1f1",
                    borderRadius: "10px",
                    padding: "5px 10px",
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {tag.tag_name}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              Users :
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {users.map((user) => (
                <a
                  key={user.id}
                  href={`/u/${user.id}`}
                  style={{
                    backgroundColor: "#f1f1f1",
                    borderRadius: "10px",
                    padding: "5px 10px",
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {user.display_name}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
