"use client";

import { Star } from "lucide-react";
import { IoMdTrash } from "react-icons/io";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useContext, useEffect, useRef } from "react";
import { SnippetContext } from "@/context/SnippetContext";
import { SingleSnippetType } from "@/app/lib/definitions";
import { getLanguageIcon } from "@/app/lib/data";

const AllSnippets = () => {
  const snippetContextData = useContext(SnippetContext);

  if (!snippetContextData) {
    return null;
  }

  const { allSnippets, isEditing } = snippetContextData;

  return (
    <div
      className={`mt-4 grid gap-5 ${
        isEditing ? `grid-cols-1` : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
      }  `}
    >
      {allSnippets.map((snippet) => (
        <SingleSnippet key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
};

export default AllSnippets;

const SingleSnippet: React.FC<{ snippet: SingleSnippetType }> = ({
  snippet,
}) => {
  const snippetContextData = useContext(SnippetContext);
  if (!snippetContextData) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }
  const { isEditing, selectedSnippet } = snippetContextData;

  const { title, tags, description, code, language, creationDate } = snippet;

  const snippetRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={snippetRef} className={`max-sm:w-full rounded-md py-2`}>
      <SnippetHeader
        title={title}
        snippet={snippet}
        snippetRef={snippetRef}
        selectedSnippet={selectedSnippet}
        isEditing={isEditing}
      />
      <SnippetTags tags={tags} />
      <SnippetDate creationDate={creationDate} />
      <SnippetDescription description={description} />
      <SnippetCode code={code} />
      <SnippetFooter language={language} />
    </div>
  );
};

const SnippetHeader: React.FC<{
  title: string;
  snippet: SingleSnippetType;
  snippetRef: React.RefObject<HTMLDivElement>;
  selectedSnippet: SingleSnippetType | null;
  isEditing: boolean;
}> = ({ title, snippet, snippetRef, selectedSnippet, isEditing }) => {
  const snippetContextData = useContext(SnippetContext);
  if (!snippetContextData) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }
  const { toggleEditing } = snippetContextData;

  useEffect(() => {
    if (isEditing && selectedSnippet?.id === snippet.id && snippetRef.current) {
      snippetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isEditing, selectedSnippet?.id]);

  return (
    <div className="flex justify-between mx-4">
      <span
        className="font-bold text-lg w-[87%] cursor-pointer"
        onClick={() => toggleEditing(snippet)}
      >
        {title}
      </span>

      <Star aria-label="Favourite" />
    </div>
  );
};

const SnippetTags: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <div className="text-[11px] mx-4 flex flex-wrap gap-1 mt-4">
      {tags.map((tag: string, index: number) => (
        <span key={index} className="bg-purple-100 p-1 px-2 rouded-lg">
          {tag}
        </span>
      ))}
    </div>
  );
};
const SnippetDate: React.FC<{ creationDate: string }> = ({ creationDate }) => {
  return (
    <div className="text-[11px] flex gap-1 font-light mx-4 mt-1">
      {creationDate}
    </div>
  );
};

const SnippetDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return <div className="text-[13px] mx-4 mt-4">{description}</div>;
};

const SnippetCode: React.FC<{ code: string }> = ({ code }) => {
  return (
    <div className="rounded-md overflow-hidden text-sm mt-2 mx-4">
      <SyntaxHighlighter language={"javascript"} style={docco} wrapLongLines>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const SnippetFooter: React.FC<{ language: string }> = ({ language }) => {
  const LanguageIcon = getLanguageIcon(language);
  return (
    <div className="flex justify-between text-[13px] text-slate-400 mx-4 mt-3">
      <div className="flex gap-1 items-center">
        {LanguageIcon && <LanguageIcon />}
        <h3>{language}</h3>
      </div>
      <div className="flex gap-1 items-center">
        <IoMdTrash />
      </div>
    </div>
  );
};
