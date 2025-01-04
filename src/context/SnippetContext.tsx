"use client";
import React, { createContext, useState, useEffect } from "react";
import {
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

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <SnippetContext.Provider
      value={{ isEditing, toggleEditing, isMobile, setIsMobile }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
