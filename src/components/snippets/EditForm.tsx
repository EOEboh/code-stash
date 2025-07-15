import AceEditorComponent from "./AceEditor";
import { addSnippetAction } from "@/app/lib/snippets/actions";
import TagsDisplay from "./TagsDisplay";
import LanguageSelector from "./LanguageSelector";
import { SingleSnippetType } from "@/app/lib/definitions";
import { EditingState } from "@/app/lib/enums";
import { useState, useTransition } from "react";

const EditForm: React.FC<{
  singleSnippet: SingleSnippetType;
  setSingleSnippet: React.Dispatch<
    React.SetStateAction<SingleSnippetType | undefined>
  >;
  allSnippets: SingleSnippetType[];
  setAllSnippets: React.Dispatch<React.SetStateAction<SingleSnippetType[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<EditingState>>;
  setSelectedSnippet?: React.Dispatch<
    React.SetStateAction<SingleSnippetType | null>
  >;
}> = ({
  singleSnippet,
  setSingleSnippet,
  allSnippets,
  setAllSnippets,
  setIsEditing,
  setSelectedSnippet,
}) => {
  const [languageForAceEditor, setLanguageForAceEditor] =
    useState<string>("javascript");
  const [isPending, startTransition] = useTransition();
  const isEditingExisting = !!singleSnippet._id;

  function updateSnippet(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    const updatedSnippet = { ...singleSnippet, [name]: value };
    setSingleSnippet(updatedSnippet);

    console.log("isEditingExisting", isEditingExisting);

    if (isEditingExisting) {
      const updatedAll = allSnippets.map((snippet) =>
        snippet.id === singleSnippet.id ? updatedSnippet : snippet
      );
      setAllSnippets(updatedAll);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  console.log("singleSnippet", singleSnippet);

  const handleSave = () => {
    if (!singleSnippet) return;

    const payload: SingleSnippetType = {
      ...singleSnippet,
      creationDate: new Date().toISOString(),
    };

    if (isEditingExisting) {
      // edit snippet
      const originalSnippet = allSnippets.find(
        (snippet) => snippet.id === singleSnippet.id
      );

      const updatedAll = allSnippets.map((snippet) =>
        snippet.id === singleSnippet.id ? payload : snippet
      );
      setAllSnippets(updatedAll);
      setIsEditing(EditingState.NONE);

      startTransition(async () => {
        try {
          await addSnippetAction(payload);
        } catch (error) {
          console.error("Failed to save snippet:", error);

          if (originalSnippet) {
            const rolledBack = allSnippets.map((snippet) =>
              snippet.id === singleSnippet.id ? originalSnippet : snippet
            );
            setAllSnippets(rolledBack);
          }

          alert("Failed to save changes. Please try again.");
        }
      });
    } else {
      // New snippet
      startTransition(async () => {
        try {
          const newSnippet = await addSnippetAction(payload);

          setAllSnippets((prev) => [...prev, newSnippet]);

          if (setSelectedSnippet) {
            setSelectedSnippet(newSnippet);
          }
          setSingleSnippet(newSnippet);

          setIsEditing(EditingState.NONE);
        } catch (error) {
          console.error("Failed to create snippet:", error);
          alert("Failed to create snippet. Please try again.");
        }
      });
    }
  };

  console.log("allSnippets", allSnippets);
  console.log("singleSnippet.id", singleSnippet.id);

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

        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};
export default EditForm;
