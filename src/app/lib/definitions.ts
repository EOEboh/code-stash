import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

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
  isNewSnippet: boolean;
  setIsNewSnippet: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface SingleTagType {
  _id: number;
  name: string;
}

export interface SingleLanguageType {
  id: string;
  label: string;
  icon: IconType;
  value: string;
}

export interface SnippetRefType {
  current: {
    scrollIntoView: (options: ScrollIntoViewOptions) => void;
  } | null;
}

export interface AddBtnProps {
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  onOpenClick?: () => void;
  onCloseClick?: () => void;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  color?: "default" | "primary" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg";
  showOnDesktop?: boolean;
}
