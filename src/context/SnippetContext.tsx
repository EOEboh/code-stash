"use client";
import React, { createContext, useState, ReactNode } from "react";

interface SnippetContextProps {
  isEditing: boolean;
  toggleEditing: () => void;
}

export const SnippetContext = createContext<SnippetContextProps | undefined>(
  undefined
);

interface SnippetProviderProps {
  children: ReactNode;
}

export const SnippetProvider: React.FC<SnippetProviderProps> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <SnippetContext.Provider value={{ isEditing, toggleEditing }}>
      {children}
    </SnippetContext.Provider>
  );
};
