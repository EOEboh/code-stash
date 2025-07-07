import { SingleLanguageType, SingleSnippetType } from "@/app/lib/definitions";
import { useRef, useState, useContext, useEffect } from "react";
import { SnippetContext } from "@/context/SnippetContext";
import { getLanguageIcon, languageData } from "@/app/lib/data";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";

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
        type="button"
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

export default LanguageSelector;
