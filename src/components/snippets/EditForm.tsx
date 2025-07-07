import AceEditorComponent from "./AceEditor";
import { addSnippetAction } from "@/app/lib/snippets/actions";
import TagsDisplay from "./TagsDisplay";
import LanguageSelector from "./LanguageSelector";
import { SingleSnippetType } from "@/app/lib/definitions";
import { EditingState } from "@/app/lib/enums";
import { useState } from "react";

const EditForm: React.FC<{
  singleSnippet: SingleSnippetType;
  setSingleSnippet: React.Dispatch<
    React.SetStateAction<SingleSnippetType | undefined>
  >;
  allSnippets: SingleSnippetType[];
  setAllSnippets: React.Dispatch<React.SetStateAction<SingleSnippetType[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<EditingState>>;
}> = ({
  singleSnippet,
  setSingleSnippet,
  allSnippets,
  setAllSnippets,
  setIsEditing,
}) => {
  const [languageForAceEditor, setLanguageForAceEditor] =
    useState<string>("javascript");

  function updateSnippet(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    const newSingleSnippet = { ...singleSnippet, [name]: value };
    setSingleSnippet(newSingleSnippet);

    const newAllSnippets = allSnippets.map((snippet) => {
      if (snippet.id === singleSnippet.id) {
        return newSingleSnippet;
      }
      return snippet;
    });
    setAllSnippets(newAllSnippets);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  const handleSave = async () => {
    if (!singleSnippet) return;

    const newSnippet = {
      id: singleSnippet.id || new Date().toISOString(),
      _id: singleSnippet._id, // for backend
      title: singleSnippet.title,
      isFavorite: singleSnippet.isFavorite,
      tags: singleSnippet.tags,
      description: singleSnippet.description,
      code: singleSnippet.code,
      language: singleSnippet.language,
      creationDate: new Date().toISOString(),
    };
    await addSnippetAction(newSnippet);

    setIsEditing(EditingState.NONE);
  };

  return (
    <form action={handleSave} className="w-full">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 rounded-lg outline-none "
          value={singleSnippet.title}
          onKeyDown={handleKeyDown}
          onChange={updateSnippet}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded-lg outline-none resize-none"
          value={singleSnippet.description}
          onKeyDown={handleKeyDown}
          onChange={updateSnippet}
        />
        <div className="flex flex-col gap-2 ">
          <div className="self-start">
            <LanguageSelector
              singleSnippet={singleSnippet}
              setSingleSnippet={setSingleSnippet}
              setLanguageForAceEditor={setLanguageForAceEditor}
            />
          </div>
          <AceEditorComponent
            languageForAceEditor={languageForAceEditor}
            singleSnippet={singleSnippet}
            onUpdate={updateSnippet}
          />
        </div>

        <TagsDisplay
          tags={singleSnippet.tags}
          setSingleSnippet={setSingleSnippet}
          singleSnippet={singleSnippet}
          allSnippets={allSnippets}
          setAllSnippets={setAllSnippets}
        />

        <button className="bg-blue-500 text-white p-2 rounded-lg" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};
export default EditForm;
