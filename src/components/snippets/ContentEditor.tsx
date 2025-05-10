"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { SnippetContext } from "@/context/SnippetContext";
import { SingleLanguageType, SingleSnippetType } from "@/app/lib/definitions";
import TagsList from "@/components/TagsList";

import { getLanguageIcon, languageData } from "@/app/lib/data";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import AceEditorComponent from "./AceEditor";

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
      className={`bg-white border p-3 rounded-lg ${
        isEditing ? "block" : "hidden"
      } ${isMobile ? "w-11/12" : "sticky top-0 w-1/2"} h-[700px] z-50`}
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
          {" "}
          <EditForm
            singleSnippet={singleSnippet}
            setSingleSnippet={setSingleSnippet}
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
  singleSnippet: SingleSnippetType;
  setSingleSnippet: React.Dispatch<
    React.SetStateAction<SingleSnippetType | undefined>
  >;
  setLanguageForAceEditor: React.Dispatch<React.SetStateAction<string>>;
}> = ({ singleSnippet, setSingleSnippet, setLanguageForAceEditor }) => {
  const snippetContext = useContext(SnippetContext);
  if (!snippetContext) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }

  const { allSnippets, setAllSnippets } = snippetContext;

  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (language: SingleLanguageType) => {
    const updatedSingleSnippet = {
      ...singleSnippet,
      language: language.label,
    };
    setSingleSnippet(updatedSingleSnippet);

    const updatedAllSnippets = allSnippets.map((snippet): SingleSnippetType => {
      if (snippet.id === singleSnippet.id) {
        return updatedSingleSnippet;
      }

      return snippet;
    });

    setAllSnippets(updatedAllSnippets);

    setIsOpen(false);
    setLanguageForAceEditor(language.value);
  };

  const filteredLanguages = languageData.filter((language) =>
    language.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const LanguageIcon = getLanguageIcon(singleSnippet?.language);

  return (
    <div className="relative w-32" ref={dropdownRef}>
      <button
        className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {LanguageIcon && <LanguageIcon />}
          <span>{singleSnippet?.language}</span>
        </div>
        {isOpen ? (
          <>
            <ChevronUp className="w-4 h-4 ml-2 text-gray-400" />
          </>
        ) : (
          <>
            <div>{!singleSnippet?.language && "Language"}</div>
            <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-8 pr-4 py-2 w-full text-sm"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language) => (
                <div
                  key={language.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center gap-2"
                  onClick={() => handleSelect(language)}
                >
                  {language.icon && <language.icon className="w-4 h-4" />}
                  {language.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No results found
              </div>
            )}
          </div>
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
  const [languageForAceEditor, setLanguageForAceEditor] =
    useState<string>("javascript");

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

  console.log("languageForAceEditor", languageForAceEditor);

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
          <LanguageSelector
            singleSnippet={singleSnippet}
            setSingleSnippet={setSingleSnippet}
            setLanguageForAceEditor={setLanguageForAceEditor}
          />
        </div>
        <AceEditorComponent
          languageForAceEditor={languageForAceEditor}
          singleSnippet={singleSnippet}
          onUpdate={updateSnippet}
        />
      </div>

      <TagsDisplay
        tags={singleSnippet.tags}
        setSingleSnippet={setSingleSnippet}
        singleSnippet={singleSnippet}
        allSnippets={allSnippets}
        setAllSnippets={setAllSnippets}
      />

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
