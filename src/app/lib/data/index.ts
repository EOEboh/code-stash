import {
  FaHtml5,
  FaJs,
  FaJava,
  FaPython,
  FaPhp,
  FaRust,
  FaSwift,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiKotlin,
  SiGo,
  SiRuby,
  SiSharp,
  SiCplusplus,
} from "react-icons/si";
import { v4 as uuidv4 } from "uuid";
import { SingleLanguageType } from "../definitions";

export const languageData: SingleLanguageType[] = [
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
  {
    id: uuidv4(),
    label: "Python",
    icon: FaPython,
  },
  {
    id: uuidv4(),
    label: "PHP",
    icon: FaPhp,
  },
  {
    id: uuidv4(),
    label: "Rust",
    icon: FaRust,
  },
  {
    id: uuidv4(),
    label: "Swift",
    icon: FaSwift,
  },
  {
    id: uuidv4(),
    label: "CSS3",
    icon: FaCss3Alt,
  },
  {
    id: uuidv4(),
    label: "Kotlin",
    icon: SiKotlin,
  },
  {
    id: uuidv4(),
    label: "Go",
    icon: SiGo,
  },
  {
    id: uuidv4(),
    label: "Ruby",
    icon: SiRuby,
  },
  {
    id: uuidv4(),
    label: "C#",
    icon: SiSharp,
  },
  {
    id: uuidv4(),
    label: "C++",
    icon: SiCplusplus,
  },
];
