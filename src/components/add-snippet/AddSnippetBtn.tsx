"use client";
import { SnippetContext } from "@/context/SnippetContext";
import { Plus, X } from "lucide-react"; // Importing X icon for the cancel button
import { useContext } from "react";

const AddSnippetBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const snippetContext = useContext(SnippetContext);
  if (!snippetContext) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }

  const { isEditing } = snippetContext;

  return (
    <>
      {/* Floating Action Button (mobile only) */}
      {!isEditing && (
        <button
          onClick={onClick}
          className="md:hidden fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg z-50"
          aria-label="Add Snippet"
        >
          <Plus className="w-5 h-5" />
        </button>
      )}

      {/* Inline Button (desktop and larger screens) */}
      <button
        onClick={onClick}
        className="hidden md:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
      >
        <Plus className="w-4 h-4" />
        <span>Add Snippet</span>
      </button>
    </>
  );
};

export default AddSnippetBtn;
