"use client";
import { useContext, useEffect, useState } from "react";
import { SnippetContext } from "@/context/SnippetContext";
import { LanguageType, SingleSnippetType } from "@/app/lib/definitions";
import TagsList from "@/components/TagsList";
import AceEditor from "react-ace";
import { config } from "ace-builds";
config.set("basePath", "path");

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { languageData } from "@/app/lib/data";

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
      className={`xl:sticky-editor border bg-white p-3 rounded-lg sticky top-0 ${
        isEditing ? "block" : "hidden"
      } ${
        isMobile
          ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          : ""
      } ${isMobile ? "w-10/12" : "w-1/2"} h-[700px] `}
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
        <>
          <EditForm
            singleSnippet={singleSnippet}
            setSingleSnippet={setSingleSnippet}
            allSnippets={allSnippets}
            setAllSnippets={setAllSnippets}
          />
          <TagsDisplay
            tags={singleSnippet.tags}
            setSingleSnippet={setSingleSnippet}
            singleSnippet={singleSnippet}
            allSnippets={allSnippets}
            setAllSnippets={setAllSnippets}
          />
        </>
      )}
    </div>
  );
};

export default ContentEditor;

const LanguageSelector: React.FC<{
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");

  const handleSelect = (language: LanguageType) => {
    setSelectedLanguage(language.label);
    setLanguage(language.label);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-col gap-2 p-3 w-full">
      <button
        className="border p-2 rounded-lg outline-none w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLanguage}
      </button>

      {isOpen && (
        <div className="h-40 max-h-40 overflow-y-auto border rounded-lg absolute bg-white w-full z-10 custom-scrollbar">
          {languageData.map((language) => (
            <div
              key={language.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(language)}
            >
              {language.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EditForm: React.FC<{
  singleSnippet: SingleSnippetType;
  setSingleSnippet: React.Dispatch<
    React.SetStateAction<SingleSnippetType | undefined>
  >;
  allSnippets: SingleSnippetType[];
  setAllSnippets: React.Dispatch<React.SetStateAction<SingleSnippetType[]>>;
}> = ({ singleSnippet, setSingleSnippet, allSnippets, setAllSnippets }) => {
  function updateSnippet(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    const newSingleSnippet = { ...singleSnippet, [name]: value };
    setSingleSnippet(newSingleSnippet);

    const newAllSnippets = allSnippets.map((snippet) => {
      if (snippet.id === singleSnippet.id) {
        return newSingleSnippet;
      }
      return snippet;
    });
    setAllSnippets(newAllSnippets);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  const [language, setLanguage] = useState("javascript");

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="border p-2 rounded-lg outline-none "
        value={singleSnippet?.title}
        onKeyDown={handleKeyDown}
        onChange={updateSnippet}
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 rounded-lg outline-none resize-none"
        value={singleSnippet?.description}
        onKeyDown={handleKeyDown}
        onChange={updateSnippet}
      />
      <div className="flex flex-col gap-2 ">
        <div className="self-start">
          <LanguageSelector setLanguage={setLanguage} />
        </div>
        <AceEditor
          placeholder="Placeholder Text"
          mode="javascript"
          theme="solarized_dark"
          name="code"
          style={{
            width: "500px",
            maxWidth: "100%",
            overflow: "hidden",
            height: "300px",
          }}
          fontSize={14}
          lineHeight={24}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={true}
          value={singleSnippet?.code}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            enableMobileMenu: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          wrapEnabled
        />
      </div>

      <button className="bg-blue-500 text-white p-2 rounded-lg">Save</button>
    </div>
  );
};

const TagsDisplay: React.FC<{
  tags: string[];
  setSingleSnippet: React.Dispatch<
    React.SetStateAction<SingleSnippetType | undefined>
  >;
  singleSnippet: SingleSnippetType;
  allSnippets: SingleSnippetType[];
  setAllSnippets: React.Dispatch<React.SetStateAction<SingleSnippetType[]>>;
}> = ({
  tags,
  setSingleSnippet,
  singleSnippet,
  allSnippets,
  setAllSnippets,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [showTagsList, setShowTagsList] = useState<boolean>(false);
  const [customTag, setCustomTag] = useState<string>("");

  const toggleTagsList = () => {
    setShowTagsList(!showTagsList);
    setIsHover(true);
  };

  const addTag = (tag: string) => {
    if (!singleSnippet.tags.includes(tag)) {
      const updatedSnippet = {
        ...singleSnippet,
        tags: [...singleSnippet.tags, tag],
      };
      setSingleSnippet(updatedSnippet);

      const updatedAllSnippets = allSnippets.map((snippet) => {
        if (snippet.id === singleSnippet.id) {
          return updatedSnippet;
        }
        return snippet;
      });
      setAllSnippets(updatedAllSnippets);
    }
  };

  const removeTag = (tag: string) => {
    const updatedSnippet = {
      ...singleSnippet,
      tags: singleSnippet.tags.filter((t) => t !== tag),
    };
    setSingleSnippet(updatedSnippet);

    const updatedAllSnippets = allSnippets.map((snippet) => {
      if (snippet.id === singleSnippet.id) {
        return updatedSnippet;
      }
      return snippet;
    });
    setAllSnippets(updatedAllSnippets);
  };

  const handleCustomTagChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomTag(event.target.value);
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() !== "") {
      addTag(customTag.trim());
      setCustomTag("");
    }
  };

  return (
    <div
      className="relative flex flex-wrap gap-2 mt-4"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {tags.length === 0 ? (
        <span className="text-gray-500">No Tags</span>
      ) : (
        tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg flex items-center gap-1"
          >
            {tag}
            <button onClick={() => removeTag(tag)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </span>
        ))
      )}
      {isHover && (
        <button onClick={toggleTagsList}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="lucide lucide-pencil"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
      )}
      {showTagsList && (
        <TagsList
          addTag={addTag}
          customTag={customTag}
          handleCustomTagChange={handleCustomTagChange}
          handleAddCustomTag={handleAddCustomTag}
          selectedTags={tags}
        />
      )}
    </div>
  );
};
