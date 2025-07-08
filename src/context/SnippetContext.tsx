"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  SingleSnippetType,
  SnippetContextProps,
  SnippetProviderProps,
} from "@/app/lib/definitions";

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

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSnippets = async () => {
      const res = await fetch("/api/snippets");
      const data = await res.json();

      const normalized = data.map((snippet: SingleSnippetType) => ({
        ...snippet,
        id: snippet._id?.toString() ?? "",
      }));

      setAllSnippets(normalized);
    };
    fetchSnippets();
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
