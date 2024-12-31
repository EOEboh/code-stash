"use client";
import { useContext } from "react";
import { SnippetContext } from "@/context/SnippetContext";

const ContentEditor = () => {
  const snippetContext = useContext(SnippetContext);
  if (!snippetContext) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }

  const { isEditing, toggleEditing } = snippetContext;
  return (
    <div
      className={`border w-1/2 bg-white p-3 rounded-lg ${
        isEditing ? "block" : "hidden"
      } h-[700px]`}
    >
      <button onClick={toggleEditing} className="flex items-center gap-2">
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
      Edit Snippet
    </div>
  );
};

export default ContentEditor;
