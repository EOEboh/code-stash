import TagsList from "@/components/TagsList";
import { SingleSnippetType } from "@/app/lib/definitions";
import { useState } from "react";

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
            <button type="button" onClick={() => removeTag(tag)}>
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
        <button type="button" onClick={toggleTagsList}>
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
export default TagsDisplay;
