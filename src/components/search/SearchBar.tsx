import React, { useState, useContext } from "react";
import { SnippetContext } from "@/context/SnippetContext";
import { SnippetContextProps } from "@/app/lib/definitions";
import { v4 as uuidv4 } from "uuid";
import { RiStickyNoteAddFill } from "react-icons/ri";
import AddSnippetBtn from "../add-snippet/AddSnippetBtn";

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

  const snippetContextData = useContext(SnippetContext);
  if (!snippetContextData) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }
  const { setIsEditing, setSelectedSnippet, setIsNewSnippet } =
    snippetContextData;

  function createNewSnippet() {
    const newSingleSnippet = {
      id: uuidv4(),
      title: "",
      isFavorite: false,
      tags: [],
      description: "",
      code: "",
      language: "",
      creationDate: "",
    };

    // if (newSingleSnippet.title === "") {
    //   newSingleSnippet.title = "Untitled Snippet";
    // }

    setIsNewSnippet(true);
    setSelectedSnippet(newSingleSnippet);
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
        <AddSnippetBtn onClick={createNewSnippet} />
      </div>
    </div>
  );
};

export default SearchBar;
