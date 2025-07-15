"use client";
import { useContext, useEffect, useState } from "react";
import { SnippetContext } from "@/context/SnippetContext";
import { SingleSnippetType } from "@/app/lib/definitions";

import { EditingState } from "@/app/lib/enums";
import EditForm from "./EditForm";

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
    setSelectedSnippet,
    allSnippets,
    setAllSnippets,
  } = snippetContext;

  const [singleSnippet, setSingleSnippet] = useState<
    SingleSnippetType | undefined
  >(undefined);

  useEffect(() => {
    if (isEditing && selectedSnippet) {
      setSingleSnippet({ ...selectedSnippet }); // clone to avoid shared reference
    }
  }, [isEditing, selectedSnippet]);

  return (
    <div
      className={`bg-white border p-3 rounded-lg ${
        isEditing === EditingState.EXISTING_SNIPPET ||
        isEditing === EditingState.NEW_SNIPPET
          ? "block"
          : "hidden"
      } ${isMobile ? "w-11/12" : "sticky top-0 w-1/2"} h-[700px] z-50`}
    >
      <button
        onClick={() => setIsEditing && setIsEditing(EditingState.NONE)}
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
        <>
          {" "}
          <EditForm
            singleSnippet={singleSnippet}
            setSingleSnippet={setSingleSnippet}
            allSnippets={allSnippets}
            setAllSnippets={setAllSnippets}
            setIsEditing={setIsEditing}
            setSelectedSnippet={setSelectedSnippet}
          />
        </>
      )}
    </div>
  );
};

export default ContentEditor;
