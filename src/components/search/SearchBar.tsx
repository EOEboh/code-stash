import React, { useState, useContext } from "react";
import { SnippetContext } from "@/context/SnippetContext";
import { SnippetContextProps } from "@/app/lib/definitions";

const SearchBar = ({}) => {
  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const term = event.target.value.toLowerCase();
  //   setSearchTerm(term);
  //   const filteredSnippets = allSnippets.filter(
  //     (snippet) =>
  //       snippet.title.toLowerCase().includes(term) ||
  //       snippet.description.toLowerCase().includes(term) ||
  //       snippet.tags.some((tag) => tag.toLowerCase().includes(term))
  //   );
  //   console.log("filteredSnippets", filteredSnippets);

  //   setAllSnippets(filteredSnippets);
  // };

  const { setIsEditing, allSnippets, setAllSnippets, setSelectedSnippet } =
    useContext(SnippetContext);

  function createNewSnippet() {
    const newSnippet = {
      id: "",
      title: "",
      isFavorite: false,
      tags: [""],
      description: "",
      code: "",
      language: "",
      creationDate: "",
    };

    setAllSnippets([...allSnippets, newSnippet]);
    setSelectedSnippet(newSnippet);
    setIsEditing(true);
  }

  return (
    <div className="max-w-full p-3 rounded-lg flex flex-col md:flex-row gap-5 bg-yellow-900">
      <div className="flex flex-wrap justify-between flex-1">
        <input
          type="text"
          value={""}
          onChange={() => {}}
          placeholder="Search snippets..."
          className="p-2 rounded-md border border-gray-300"
        />

        <button onClick={createNewSnippet}>Add Snippet</button>
      </div>
    </div>
  );
};

export default SearchBar;
