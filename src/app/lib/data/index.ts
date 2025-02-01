import { FaHtml5, FaJs, FaJava } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { v4 as uuidv4 } from "uuid";
import { LanguageType } from "../definitions";

export const languageData: LanguageType[] = [
  {
    id: uuidv4(),
    label: "HTML5",
    icon: FaHtml5,
  },
  {
    id: uuidv4(),
    label: "JavaScript",
    icon: FaJs,
  },
  {
    id: uuidv4(),
    label: "TypeScript",
    icon: SiTypescript,
  },
  {
    id: uuidv4(),
    label: "Java",
    icon: FaJava,
  },
];
