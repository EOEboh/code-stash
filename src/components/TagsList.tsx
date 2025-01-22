import React from "react";

const TagsList: React.FC<{
  addTag: (tag: string) => void;
  customTag: string;
  handleCustomTagChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCustomTag: () => void;
  selectedTags: string[]; // Add selectedTags prop
}> = ({
  addTag,
  customTag,
  handleCustomTagChange,
  handleAddCustomTag,
  selectedTags,
}) => {
  const allTags = [
    { _id: 1, name: "JavaScript" },
    { _id: 2, name: "TypeScript" },
    { _id: 3, name: "Python" },
    { _id: 4, name: "Rust" },
  ];

  return (
    <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-2">
      <ul className="py-1">
        {allTags.map((tag, index) => {
          const isSelected = selectedTags.includes(tag.name);
          return (
            <li
              key={index}
              className={`px-4 py-2 cursor-pointer ${
                isSelected
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => !isSelected && addTag(tag.name)}
            >
              {tag.name}
            </li>
          );
        })}
      </ul>
      <div className="flex items-center mt-2">
        <input
          type="text"
          value={customTag}
          onChange={handleCustomTagChange}
          placeholder="Add custom tag"
          className="border p-2 rounded-lg outline-none flex-grow"
        />
        <button
          onClick={handleAddCustomTag}
          className="bg-blue-500 text-white p-2 rounded-lg ml-2"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TagsList;
