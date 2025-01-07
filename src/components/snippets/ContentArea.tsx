"use client";
import Tags from "@/components/snippets/Tags";
import AllSnippets from "@/components/snippets/AllSnippets";
import { useContext } from "react";
import { SnippetContext } from "@/context/SnippetContext";

const ContentArea = () => {
  const snippetContextData = useContext(SnippetContext);
  if (!snippetContextData) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }

  const { isEditing } = snippetContextData;
  return (
    <div
      className={`${
        isEditing ? "w-[50%]" : "w-full"
      }  max-w-[1112px] flex flex-col gap-5`}
    >
      <Tags />
      <AllSnippets />
    </div>
  );
};

ContentArea.displayName = "ContentArea";

export default ContentArea;
