"use client";

import { Star } from "lucide-react";
import { FaJs } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useContext } from "react";
import { SnippetContext } from "@/context/SnippetContext";

const AllSnippets = () => {
  return (
    <div className="mt-5 flex flex-wrap gap-5">
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
    </div>
  );
};

export default AllSnippets;

const SingleSnippet = () => {
  const snippetContext = useContext(SnippetContext);
  if (!snippetContext) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }
  const { isEditing } = snippetContext;

  return (
    <div
      className={`max-sm:w-full ${
        isEditing ? "w-full" : "w-[320px]"
      }  rounded-md py-2`}
    >
      <SnippetHeader />
      <SnippetTags />
      <SnippetDate />
      <SnippetDescription />
      <SnippetCode />
      <SnippetFooter />
    </div>
  );
};

const SnippetHeader = () => {
  const snippetContext = useContext(SnippetContext);
  if (!snippetContext) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }
  const { toggleEditing } = snippetContext;

  return (
    <div className="flex justify-between mx-4">
      <span
        className="font-bold text-lg w-[87%] cursor-pointer"
        onClick={toggleEditing}
      >
        Title
      </span>

      <Star aria-label="Favourite" />
    </div>
  );
};
const SnippetTags = () => {
  return (
    <div className="text-[11px] mx-4 flex flex-wrap gap-1 mt-4">
      <span className="bg-purple-100 p-1 px-2 rouded-lg">functions</span>
      <span className="bg-purple-100 p-1 px-2 rouded-lg">functions</span>
      <span className="bg-purple-100 p-1 px-2 rouded-lg">functions</span>
      <span className="bg-purple-100 p-1 px-2 rouded-lg">functions</span>
    </div>
  );
};
const SnippetDate = () => {
  return (
    <div className="text-[11px] flex gap-1 font-light mx-4 mt-1">
      19th December, 2024
    </div>
  );
};

const SnippetDescription = () => {
  return (
    <div className="text-[13px] mx-4 mt-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla maxime vero
      neque, molestiae adipisci harum cumque assumenda quam labore fugiat
      dolorum laborum, fugit facilis? Pariatur!
    </div>
  );
};

const SnippetCode: React.FC<{ language: string }> = ({ language }) => {
  const codeString = "(num) => num + 1";
  return (
    <div className="rounded-md overflow-hidden text-sm mt-2 mx-4">
      <SyntaxHighlighter language="javascript" style={docco} wrapLongLines>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

const SnippetFooter = () => {
  return (
    <div className="flex justify-between text-[13px] text-slate-400 mx-4 mt-3">
      <div className="flex gap-1 items-center">
        <FaJs />
      </div>
      <div className="flex gap-1 items-center">
        <IoMdTrash />
      </div>
    </div>
  );
};
