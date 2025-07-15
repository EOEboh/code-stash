import React, { useContext } from "react";
import { SnippetContext } from "@/context/SnippetContext";
import { v4 as uuidv4 } from "uuid";
import AddSnippetBtnFAB from "../add-snippet/AddSnippetBtnFAB";
import AddSnippetBtn from "../add-snippet/AddSnippetBtn";
import { EditingState } from "@/app/lib/enums";

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
  const { isEditing, setIsEditing, setSelectedSnippet } = snippetContextData;

  function createNewSnippet() {
    const newSingleSnippet = {
      id: uuidv4(),
      _id: undefined,
      title: "",
      isFavorite: false,
      tags: [],
      description: "",
      code: "",
      language: "",
      creationDate: "",
    };

    setSelectedSnippet(newSingleSnippet);
    setIsEditing(EditingState.NEW_SNIPPET);
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
        <AddSnippetBtn
          isEditing={isEditing}
          onOpenClick={createNewSnippet}
          onCloseClick={() => setIsEditing(EditingState.NONE)}
        />
      </div>
      <AddSnippetBtnFAB
        isEditing={isEditing}
        onOpenClick={createNewSnippet}
        onCloseClick={() => setIsEditing && setIsEditing(EditingState.NONE)}
      />
    </div>
  );
};

export default SearchBar;
