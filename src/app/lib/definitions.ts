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
  toggleEditing: () => void;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SnippetProviderProps {
  children: ReactNode;
}
