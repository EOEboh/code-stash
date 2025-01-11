"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  SingleSnippetType,
  SnippetContextProps,
  SnippetProviderProps,
} from "@/app/lib/definitions";

export const SnippetContext = createContext<SnippetContextProps | undefined>(
  undefined
);

export const SnippetProvider: React.FC<SnippetProviderProps> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [allSnippets, setAllSnippets] = useState<SingleSnippetType[]>([]);
  const [selectedSnippet, setSelectedSnippet] =
    useState<SingleSnippetType | null>(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleEditing = (snippet: SingleSnippetType) => {
    setIsEditing((prevState) => {
      if (selectedSnippet?.id === snippet.id) {
        return !prevState;
      }
      return true;
    });
    setSelectedSnippet(snippet);
  };

  useEffect(() => {
    const fetchSnippets = async () => {
      const allNotes = [
        {
          id: "1",
          title: "Hello World",
          isFavorite: true,
          tags: ["React", "JavaScript"],
          description: "A simple hello world snippet",
          code: `console.log("Hello World")`,
          language: "TypeScript",
          creationDate: "2021-09-01",
        },
        {
          id: "2",
          title: "Fetch Data",
          isFavorite: false,
          tags: ["React", "API"],
          description: "Snippet to fetch data from an API",
          code: `fetch('https://api.example.com/data').then(response => response.json()).then(data => console.log(data));`,
          language: "JavaScript",
          creationDate: "2021-10-01",
        },
        {
          id: "3",
          title: "Array Map",
          isFavorite: true,
          tags: ["JavaScript", "Array"],
          description: "Using map function on an array",
          code: `const numbers = [1, 2, 3]; const doubled = numbers.map(num => num * 2); console.log(doubled);`,
          language: "JavaScript",
          creationDate: "2021-11-01",
        },
        {
          id: "4",
          title: "Styled Component",
          isFavorite: false,
          tags: ["React", "CSS"],
          description: "Creating a styled component",
          code: `import styled from 'styled-components'; const Button = styled.button\`background: blue; color: white;\`;`,
          language: "TypeScript",
          creationDate: "2021-12-01",
        },
        {
          id: "5",
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
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
