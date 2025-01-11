import { ReactNode } from "react";

export type SessionType = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
};

export interface NavItemsType {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    isActive?: boolean | undefined;
  }[];
}

export interface SnippetContextProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  toggleEditing: (snippet: SingleSnippetType) => void;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  allSnippets: SingleSnippetType[];
  setAllSnippets: React.Dispatch<React.SetStateAction<SingleSnippetType[]>>;
  selectedSnippet: SingleSnippetType | null;
  setSelectedSnippet: React.Dispatch<
    React.SetStateAction<SingleSnippetType | null>
  >;
}

export interface SnippetProviderProps {
  children: ReactNode;
}

export interface SingleSnippetType {
  id: string;
  title: string;
  isFavorite: boolean;
  tags: string[];
  description: string;
  code: string;
  language: string;
  creationDate: string;
}
