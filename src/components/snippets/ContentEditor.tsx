"use client";
import { useContext, useEffect, useState } from "react";
import { SnippetContext } from "@/context/SnippetContext";
import { SingleSnippetType } from "@/app/lib/definitions";

const ContentEditor = () => {
  const snippetContext = useContext(SnippetContext);
  if (!snippetContext) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }

  const {
    isEditing,
    setIsEditing,
    isMobile,
    selectedSnippet,
    allSnippets,
    setAllSnippets,
    isNewSnippet,
    setIsNewSnippet,
  } = snippetContext;

  const [singleSnippet, setSingleSnippet] = useState<
    SingleSnippetType | undefined
  >(undefined);

  useEffect(() => {
    if (isEditing) {
      if (selectedSnippet) {
        setSingleSnippet(selectedSnippet);
      }
    }
  }, [isEditing, selectedSnippet]);

  useEffect(() => {
    if (isNewSnippet) {
      if (singleSnippet && singleSnippet.title !== "") {
        setAllSnippets([...allSnippets, singleSnippet]);

        setIsNewSnippet(false);
      }
    }
  }, [singleSnippet]);

  // console.log("singleSnippet", singleSnippet);

  return (
    <div
      className={`border bg-white p-3 rounded-lg ${
        isEditing ? "block" : "hidden"
      } ${
        isMobile
          ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          : ""
      } ${isMobile ? "w-10/12" : "w-1/2"} h-[700px]`}
    >
      <button
        onClick={() => setIsEditing && setIsEditing(false)}
        className="flex items-center gap-2 mb-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {singleSnippet && (
        <EditForm
          singleSnippet={singleSnippet}
          setSingleSnippet={setSingleSnippet}
          allSnippets={allSnippets}
          setAllSnippets={setAllSnippets}
        />
      )}
    </div>
  );
};

export default ContentEditor;

const EditForm: React.FC<{
  singleSnippet: SingleSnippetType;
  setSingleSnippet: React.Dispatch<
    React.SetStateAction<SingleSnippetType | undefined>
  >;
  allSnippets: SingleSnippetType[];
  setAllSnippets: React.Dispatch<React.SetStateAction<SingleSnippetType[]>>;
}> = ({ singleSnippet, setSingleSnippet, allSnippets, setAllSnippets }) => {
  function updateSnippet(event: React.ChangeEvent<HTMLInputElement>) {
    const newSingleSnippet = { ...singleSnippet, title: event.target.value };
    setSingleSnippet(newSingleSnippet);

    const newAllSnippets = allSnippets.map((snippet) => {
      if (snippet.id === singleSnippet.id) {
        return newSingleSnippet;
      }
      return snippet;
    });
    setAllSnippets(newAllSnippets);
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 rounded-lg"
        value={singleSnippet?.title}
        onChange={updateSnippet}
      />
      <textarea
        placeholder="Description"
        className="border p-2 rounded-lg"
      ></textarea>
      <textarea
        placeholder="Code"
        className="border p-2 rounded-lg h-[400px]"
      ></textarea>
      <button className="bg-blue-500 text-white p-2 rounded-lg">Save</button>
    </div>
  );
};
