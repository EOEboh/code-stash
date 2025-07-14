"use client";

import type React from "react";
import { useState } from "react";
import { X, Plus, Tag } from "lucide-react";
import TagsList from "@/components/TagsList";
import type { SingleSnippetType } from "@/app/lib/definitions";

interface TagsDisplayProps {
  tags: string[];
  setSingleSnippet: React.Dispatch<
    React.SetStateAction<SingleSnippetType | undefined>
  >;
  singleSnippet: SingleSnippetType;
  allSnippets: SingleSnippetType[];
  setAllSnippets: React.Dispatch<React.SetStateAction<SingleSnippetType[]>>;
}

const TagsDisplay: React.FC<TagsDisplayProps> = ({
  tags,
  setSingleSnippet,
  singleSnippet,
  allSnippets,
  setAllSnippets,
}) => {
  const [showTagsList, setShowTagsList] = useState<boolean>(false);
  const [customTag, setCustomTag] = useState<string>("");
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);

  const updateSnippetTags = (newTags: string[]) => {
    const updatedSnippet = {
      ...singleSnippet,
      tags: newTags,
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

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !singleSnippet.tags.includes(trimmedTag)) {
      updateSnippetTags([...singleSnippet.tags, trimmedTag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateSnippetTags(singleSnippet.tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCustomTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTag.trim()) {
      addTag(customTag);
      setCustomTag("");
      setIsAddingTag(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setCustomTag("");
      setIsAddingTag(false);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleCustomTagSubmit(e);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Tags Container */}
      <div className="border p-2 rounded-lg min-h-[44px] bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Tags</span>
            {tags.length > 0 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {tags.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowTagsList(!showTagsList)}
              className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded transition-colors"
            >
              Browse
            </button>
            <button
              type="button"
              onClick={() => setIsAddingTag(!isAddingTag)}
              className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded transition-colors flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>
        </div>

        {/* Tags Display */}
        {tags.length === 0 ? (
          <div className="text-gray-400 text-sm py-1">No tags added</div>
        ) : (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
              >
                <span className="max-w-[100px] truncate" title={tag}>
                  {tag}
                </span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  aria-label={`Remove ${tag} tag`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Custom Tag Input */}
      {isAddingTag && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter tag name..."
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border p-2 rounded-lg outline-none flex-1 text-sm"
            autoFocus
          />
          <button
            type="button"
            onClick={handleCustomTagSubmit}
            disabled={!customTag.trim()}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setCustomTag("");
              setIsAddingTag(false);
            }}
            className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Tags List Dropdown - Mobile Responsive */}
      {showTagsList && (
        <>
          {/* Mobile Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setShowTagsList(false)}
          />

          {/* Desktop Dropdown / Mobile Modal */}
          <div className="fixed md:absolute bottom-0 left-0 right-0 md:top-0 md:left-0 md:right-0 md:bottom-auto z-50 bg-white border border-gray-300 rounded-t-lg md:rounded-lg shadow-lg max-h-[80vh] md:max-h-80 transform transition-transform duration-300 ease-out translate-y-0">
            <TagsList
              addTag={addTag}
              customTag={customTag}
              handleCustomTagChange={(e) => setCustomTag(e.target.value)}
              handleAddCustomTag={() => {
                if (customTag.trim()) {
                  addTag(customTag);
                  setCustomTag("");
                }
              }}
              selectedTags={tags}
              onClose={() => setShowTagsList(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TagsDisplay;
