"use client";
import React, { useContext } from "react";
import ContentArea from "../snippets/ContentArea";
import ContentEditor from "../snippets/ContentEditor";
import { SnippetContext } from "@/context/SnippetContext";

const HomeContent = () => {
  const snippetContext = useContext(SnippetContext);

  if (!snippetContext) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }

  const { isEditing, isMobile } = snippetContext;
  return (
    <>
      <div className="flex gap-2 mt-2 mx-2 ">
        <ContentArea />
        {!isMobile && <ContentEditor />}
      </div>

      {isMobile && isEditing && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
          <ContentEditor />
        </div>
      )}
    </>
  );
};

export default HomeContent;
