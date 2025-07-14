"use client";

import type React from "react";
import { useState } from "react";
import { Search, Plus, X } from "lucide-react";

interface TagsListProps {
  addTag: (tag: string) => void;
  customTag: string;
  handleCustomTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCustomTag: () => void;
  selectedTags: string[];
  onClose: () => void;
}

// Sample predefined tags - replace with your actual tags data
const PREDEFINED_TAGS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "CSS",
  "HTML",
  "API",
  "Database",
  "Authentication",
  "UI/UX",
  "Performance",
  "Testing",
  "DevOps",
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "Web Development",
];

const TagsList: React.FC<TagsListProps> = ({
  addTag,
  customTag,
  handleCustomTagChange,
  handleAddCustomTag,
  selectedTags,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTags = PREDEFINED_TAGS.filter(
    (tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedTags.includes(tag)
  );

  const handleTagClick = (tag: string) => {
    addTag(tag);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header - Mobile optimized */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 md:bg-white md:border-b-0 md:p-3">
        <h3 className="text-base md:text-sm font-medium text-gray-700">
          Add Tags
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 md:p-0"
        >
          <X className="h-5 w-5 md:h-4 md:w-4" />
        </button>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 md:p-3">
        {/* Search */}
        <div className="relative mb-4 md:mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-3 md:py-2 border border-gray-300 rounded-lg outline-none text-base md:text-sm focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Quick Add Custom Tag */}
        <div className="flex gap-2 mb-4 md:mb-3">
          <input
            type="text"
            placeholder="Create new tag..."
            value={customTag}
            onChange={handleCustomTagChange}
            className="flex-1 px-3 py-3 md:py-2 border border-gray-300 rounded-lg outline-none text-base md:text-sm focus:border-blue-500 transition-colors"
          />
          <button
            type="button"
            onClick={handleAddCustomTag}
            disabled={!customTag.trim()}
            className="bg-blue-500 text-white px-4 md:px-3 py-3 md:py-2 rounded-lg text-base md:text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 whitespace-nowrap"
          >
            <Plus className="h-4 w-4 md:h-3 md:w-3" />
            Add
          </button>
        </div>

        {/* Available Tags */}
        <div>
          <h4 className="text-sm md:text-xs font-medium text-gray-500 mb-3 md:mb-2 uppercase tracking-wide">
            Available Tags
          </h4>
          <div className="flex flex-wrap gap-2 md:gap-1">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="inline-flex items-center bg-gray-50 hover:bg-blue-50 hover:text-blue-700 text-gray-700 text-sm md:text-xs px-3 md:px-2 py-2 md:py-1 rounded-lg md:rounded border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer min-h-[44px] md:min-h-0"
                >
                  {tag}
                </button>
              ))
            ) : (
              <p className="text-base md:text-sm text-gray-500 py-4 md:py-2">
                {searchTerm
                  ? "No tags found matching your search"
                  : "All available tags are already selected"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Footer - Close button */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 md:hidden">
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-gray-600 text-white py-3 rounded-lg text-base font-medium hover:bg-gray-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TagsList;
