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
  SiElixir,
  SiSass,
  SiJson,
  SiXml,
  SiMarkdown,
  SiCplusplus,
  SiYaml,
} from "react-icons/si";
import { v4 as uuidv4 } from "uuid";
import { SingleLanguageType } from "../definitions";

export const languageData: SingleLanguageType[] = [
  {
    id: uuidv4(),
    label: "HTML5",
    icon: FaHtml5,
    value: "html",
  },
  {
    id: uuidv4(),
    label: "JavaScript",
    icon: FaJs,
    value: "javascript",
  },
  {
    id: uuidv4(),
    label: "TypeScript",
    icon: SiTypescript,
    value: "typescript",
  },
  {
    id: uuidv4(),
    label: "Java",
    icon: FaJava,
    value: "java",
  },
  {
    id: uuidv4(),
    label: "Python",
    icon: FaPython,
    value: "python",
  },
  {
    id: uuidv4(),
    label: "PHP",
    icon: FaPhp,
    value: "javascript",
  },
  {
    id: uuidv4(),
    label: "CSS3",
    icon: FaCss3Alt,
    value: "css",
  },
  {
    id: uuidv4(),
    label: "SASS",
    icon: SiSass,
    value: "scss",
  },
  {
    id: uuidv4(),
    label: "Rust",
    icon: FaRust,
    value: "rust",
  },
  {
    id: uuidv4(),
    label: "Swift",
    icon: FaSwift,
    value: "swift",
  },
  {
    id: uuidv4(),
    label: "Kotlin",
    icon: SiKotlin,
    value: "kotlin",
  },
  {
    id: uuidv4(),
    label: "JSON",
    icon: SiJson,
    value: "json",
  },
  {
    id: uuidv4(),
    label: "XML",
    icon: SiXml,
    value: "xml",
  },
  {
    id: uuidv4(),
    label: "Go",
    icon: SiGo,
    value: "golang",
  },
  {
    id: uuidv4(),
    label: "Ruby",
    icon: SiRuby,
    value: "ruby",
  },
  {
    id: uuidv4(),
    label: "C#",
    icon: SiSharp,
    value: "csharp",
  },
  {
    id: uuidv4(),
    label: "C++",
    icon: SiCplusplus,
    value: "c_cpp",
  },
  {
    id: uuidv4(),
    label: "Elixir",
    icon: SiElixir,
    value: "elixir",
  },
  {
    id: uuidv4(),
    label: "Markdown",
    icon: SiMarkdown,
    value: "markdown",
  },
  {
    id: uuidv4(),
    label: "YAML",
    icon: SiYaml,
    value: "yaml",
  },
];

export const getLanguageIcon = (languageLabel: string) => {
  const language = languageData.find((lang) => lang.label === languageLabel);
  return language ? language.icon : null;
};
