"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  SingleSnippetType,
  SnippetContextProps,
  SnippetProviderProps,
} from "@/app/lib/definitions";
import { v4 as uuidv4 } from "uuid";
import { EditingState } from "@/app/lib/enums";

export const SnippetContext = createContext<SnippetContextProps | undefined>(
  undefined
);

export const SnippetProvider: React.FC<SnippetProviderProps> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState<EditingState>(EditingState.NONE);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [allSnippets, setAllSnippets] = useState<SingleSnippetType[]>([]);
  const [selectedSnippet, setSelectedSnippet] =
    useState<SingleSnippetType | null>(null);
  const [isNewSnippet, setIsNewSnippet] = useState<boolean>(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleEditing = (snippet: SingleSnippetType) => {
    const isSnippetSame = selectedSnippet?.id === snippet.id;

    setIsEditing((prevState) => {
      if (isSnippetSame) {
        return prevState === EditingState.EXISTING_SNIPPET
          ? EditingState.NONE
          : EditingState.EXISTING_SNIPPET;
      }
      return EditingState.EXISTING_SNIPPET;
    });
    setSelectedSnippet({ ...snippet });
  };
  console.log("isEditing", isEditing);

  useEffect(() => {
    const fetchSnippets = async () => {
      const allNotes = [
        {
          id: uuidv4(),
          title: "Hello World",
          isFavorite: true,
          tags: ["React", "JavaScript"],
          description: "A simple hello world snippet",
          code: `console.log("Hello World")`,
          language: "TypeScript",
          creationDate: "2021-09-01",
        },
        {
          id: uuidv4(),
          title: "Fetch Data",
          isFavorite: false,
          tags: ["React", "API"],
          description: "Snippet to fetch data from an API",
          code: `import React, { useState, useContext } from "react";
          import { SnippetContext } from "@/context/SnippetContext";
          import { SnippetContextProps } from "@/app/lib/definitions";
          import { v4 as uuidv4 } from "uuid";
          import { RiStickyNoteAddFill } from "react-icons/ri";
          import AddSnippetBtnFAB from "../add-snippet/AddSnippetBtnFAB";
          import AddSnippetBtn from "../add-snippet/AddSnippetBtn";
          
          const SearchBar = ({}) => {
            // const [searchTerm, setSearchTerm] = useState("");
          
            // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
            //   const term = event.target.value.toLowerCase();
            //   setSearchTerm(term);
            //   const filteredSnippets = allSnippets.filter(
            //     (snippet) =>
            //       snippet.title.toLowerCase().includes(term) ||
            //       snippet.description.toLowerCase().includes(term) ||
            //       snippet.tags.some((tag) => tag.toLowerCase().includes(term))
            //   );
            //   console.log("filteredSnippets", filteredSnippets);
          
            //   setAllSnippets(filteredSnippets);
            // };
          
            const snippetContextData = useContext(SnippetContext);
            if (!snippetContextData) {
              throw new Error("SnippetContext must be used within a SnippetProvider");
            }
            const { setSelectedSnippet, setIsNewSnippet } =
              snippetContextData;
          
            function createNewSnippet() {
              const newSingleSnippet = {
                id: uuidv4(),
                title: "",
                isFavorite: false,
                tags: [],
                description: "",
                code: "",
                language: "",
                creationDate: "",
              };
          
              // if (newSingleSnippet.title === "") {
              //   newSingleSnippet.title = "Untitled Snippet";
              // }
          
              setIsNewSnippet(true);
              setSelectedSnippet(newSingleSnippet);
              
            }
          
      
          
          export default SearchBar;
          `,
          language: "JavaScript",
          creationDate: "2021-10-01",
        },
        {
          id: uuidv4(),
          title: "Array Map",
          isFavorite: true,
          tags: ["JavaScript", "Array"],
          description: "Using map function on an array",
          code: `const numbers = [1, 2, 3]; const doubled = numbers.map(num => num * 2); console.log(doubled);`,
          language: "JavaScript",
          creationDate: "2021-11-01",
        },
        {
          id: uuidv4(),
          title: "Styled Component",
          isFavorite: false,
          tags: ["React", "CSS"],
          description: "Creating a styled component",
          code: `import styled from 'styled-components'; const Button = styled.button\`background: blue; color: white;\`;`,
          language: "TypeScript",
          creationDate: "2021-12-01",
        },
        {
          id: uuidv4(),
          title: "UseEffect Hook",
          isFavorite: true,
          tags: ["React", "Hooks"],
          description: "Using useEffect hook in React",
          code: `useEffect(() => { console.log('Component mounted'); }, []);`,
          language: "TypeScript",
          creationDate: "2022-01-01",
        },
      ];

      setTimeout(() => {
        setAllSnippets(allNotes);
      }, 2000);
    };

    fetchSnippets();
  }, []);

  return (
    <SnippetContext.Provider
      value={{
        isEditing,
        setIsEditing,
        toggleEditing,
        isMobile,
        setIsMobile,
        allSnippets,
        setAllSnippets,
        selectedSnippet,
        setSelectedSnippet,
        isNewSnippet,
        setIsNewSnippet,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
