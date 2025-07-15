"use client";
import { ChevronDown, ChevronUp, Code2, Plus, Star } from "lucide-react";
import type React from "react";
import { IoMdTrash } from "react-icons/io";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useContext, useEffect, useRef, useState, useTransition } from "react";
import { SnippetContext } from "@/context/SnippetContext";
import type { SingleSnippetType } from "@/app/lib/definitions";
import { getLanguageIcon } from "@/app/lib/data";
import { Button } from "../ui/button";
import { EditingState } from "@/app/lib/enums";
import { deleteSnippetAction } from "@/app/lib/snippets/actions";
import DeleteConfirmationModal from "../modals/DeleteModal";
import { v4 as uuidv4 } from "uuid";

type DeleteModalState = {
  isOpen: boolean;
  snippetId: string | null;
  snippetTitle: string;
};

const AllSnippets = () => {
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    snippetId: null,
    snippetTitle: "",
  });
  const [isPending, startTransition] = useTransition();

  const snippetContextData = useContext(SnippetContext);
  if (!snippetContextData) {
    return null;
  }
  const {
    allSnippets,
    isEditing,
    setAllSnippets,
    setSelectedSnippet,
    setIsEditing,
  } = snippetContextData;

  const handleDeleteClick = (snippet: SingleSnippetType) => {
    setDeleteModal({
      isOpen: true,
      snippetId: snippet._id ?? null,
      snippetTitle: snippet.title,
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteModal.snippetId) return;

    const snippetIdToDelete = deleteModal.snippetId;

    // remove the snippet from UI immediately
    const originalSnippets = [...allSnippets];
    const updatedSnippets = allSnippets.filter(
      (snippet) => snippet._id !== snippetIdToDelete
    );
    setAllSnippets(updatedSnippets);

    // close modal immediately
    setDeleteModal({ isOpen: false, snippetId: null, snippetTitle: "" });

    startTransition(async () => {
      try {
        await deleteSnippetAction(snippetIdToDelete);
      } catch (error) {
        console.error("Delete failed:", error);
        // Rollback if deletion fails
        setAllSnippets(originalSnippets);

        // Optional: show a toast or alert
        alert("Failed to delete snippet. Please try again.");
      }
    });
  };

  const handleDeleteCancel = () => {
    if (!isPending) {
      setDeleteModal({ isOpen: false, snippetId: null, snippetTitle: "" });
    }
  };

  const createNewSnippet = () => {
    const newSingleSnippet = {
      id: uuidv4(),
      _id: undefined,
      title: "",
      isFavorite: false,
      tags: [],
      description: "",
      code: "",
      language: "",
      creationDate: "",
    };

    setSelectedSnippet(newSingleSnippet);
    setIsEditing(EditingState.NEW_SNIPPET);
  };

  return (
    <div className="p-4 bg-background-light min-h-screen">
      <div className="max-w-7xl mx-auto">
        {allSnippets.length === 0 ? (
          <EmptyState onCreateNew={createNewSnippet} />
        ) : isEditing === EditingState.EXISTING_SNIPPET ||
          isEditing === EditingState.NEW_SNIPPET ? (
          // Show one-column layout during editing
          <div className="grid grid-cols-1 gap-3">
            {allSnippets.map((snippet) => (
              <SingleSnippet
                key={snippet.id || snippet._id}
                snippet={snippet}
                onDelete={() => handleDeleteClick(snippet)}
              />
            ))}
          </div>
        ) : (
          // Masonry layout when not editing
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {allSnippets.map((snippet) => (
              <div
                key={snippet.id || snippet._id}
                className="break-inside-avoid mb-6"
              >
                <SingleSnippet
                  snippet={snippet}
                  onDelete={() => handleDeleteClick(snippet)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Snippet"
          message={`Are you sure you want to delete "${deleteModal.snippetTitle}"? This action cannot be undone.`}
          isLoading={isPending}
        />
      </div>
    </div>
  );
};

export default AllSnippets;

const SingleSnippet: React.FC<{
  snippet: SingleSnippetType;
  onDelete: () => void;
}> = ({ snippet, onDelete }) => {
  const snippetContextData = useContext(SnippetContext);
  if (!snippetContextData) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }
  const { isEditing, selectedSnippet } = snippetContextData;
  const { title, tags, description, code, language, creationDate } = snippet;
  const snippetRef = useRef<HTMLDivElement>(null);
  const isSelected =
    selectedSnippet?.id === snippet.id &&
    isEditing === EditingState.EXISTING_SNIPPET;

  return (
    <div
      ref={snippetRef}
      className={`
    bg-white rounded-xl border transition-all duration-200 hover:shadow-lg
    min-h-[220px] 
    ${
      isSelected
        ? "border-primary shadow-lg ring-2 ring-primary/20"
        : "border-gray-200 hover:border-primary/30"
    }
  `}
    >
      <SnippetHeader
        title={title}
        snippet={snippet}
        snippetRef={snippetRef}
        selectedSnippet={selectedSnippet}
        isEditing={isEditing}
      />
      <div className="px-5 pb-5 space-y-4 flex flex-col flex-grow">
        <SnippetTags tags={tags} />
        <SnippetDate creationDate={creationDate} />
        <SnippetDescription description={description} />
        <SnippetCode code={code} />
        <SnippetFooter language={language} onDelete={onDelete} />
      </div>
    </div>
  );
};

const SnippetHeader: React.FC<{
  title: string;
  // onEdit: () => void;
  // onFavorite: () => void;
  snippet: SingleSnippetType;
  snippetRef: React.RefObject<HTMLDivElement>;
  selectedSnippet: SingleSnippetType | null;
  isEditing: EditingState;
}> = ({
  title,
  // onEdit,
  // onFavorite,
  snippet,
  snippetRef,
  selectedSnippet,
  isEditing,
}) => {
  const snippetContextData = useContext(SnippetContext);
  if (!snippetContextData) {
    throw new Error("SnippetContext must be used within a SnippetProvider");
  }
  const { toggleEditing } = snippetContextData;

  useEffect(() => {
    if (
      isEditing === EditingState.EXISTING_SNIPPET &&
      selectedSnippet?.id === snippet.id &&
      snippetRef.current
    ) {
      snippetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isEditing, selectedSnippet?.id]);

  return (
    <div className="flex items-start justify-between p-5 pb-0">
      <h3
        className="font-semibold text-lg text-neutral-900 cursor-pointer hover:text-primary transition-colors duration-200 flex-1 mr-3 line-clamp-2"
        onClick={() => toggleEditing(snippet)}
        title={title}
      >
        {title}
      </h3>
      <button
        className="text-neutral-500 hover:text-accent-purple transition-colors duration-200 p-1 rounded-md hover:bg-background-subtle"
        // onClick={onFavorite}
        aria-label="Favourite"
      >
        <Star className="w-5 h-5" />
      </button>
    </div>
  );
};

const SnippetTags: React.FC<{ tags: string[] }> = ({ tags }) => {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string, index: number) => (
        <span
          key={index}
          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-background-subtle text-primary border border-primary-light/50 hover:bg-primary-light/20 transition-colors duration-200"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

const SnippetDate: React.FC<{ creationDate: string }> = ({ creationDate }) => {
  const formattedDate = new Date(creationDate).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-xs text-neutral-500 font-medium">{formattedDate}</div>
  );
};

const SnippetDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  if (!description) return null;

  return (
    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
      {description}
    </p>
  );
};

const SnippetCode: React.FC<{
  code: string;
  maxLines?: number;
  minTruncateLength?: number;
}> = ({ code, maxLines = 5, minTruncateLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const shouldTruncate = code.length > minTruncateLength;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 bg-background-light">
      <div
        className={`relative ${
          !isExpanded ? "max-h-[150px] overflow-hidden" : ""
        }`}
      >
        <SyntaxHighlighter
          language={"javascript"}
          style={docco}
          wrapLongLines
          className={
            !isExpanded && shouldTruncate ? "line-clamp-[var(--max-lines)]" : ""
          }
          customStyle={{
            margin: 0,
            padding: "12px",
            fontSize: "13px",
            lineHeight: "1.4",
            backgroundColor: "#f8fafc",
            ...(!isExpanded && shouldTruncate
              ? ({ "--max-lines": maxLines } as React.CSSProperties)
              : {}),
          }}
        >
          {code}
        </SyntaxHighlighter>
        {!isExpanded && shouldTruncate && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background-light to-transparent pointer-events-none" />
        )}
      </div>
      {shouldTruncate && (
        <div className="flex justify-center py-2 border-t border-gray-100 bg-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleExpand}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-primary hover:bg-background-subtle transition-colors duration-200 h-7 px-3"
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                <span>Show more</span>
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

const SnippetFooter: React.FC<{
  language: string;
  onDelete: () => void;
}> = ({ language, onDelete }) => {
  const LanguageIcon = getLanguageIcon(language);

  return (
    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
      <div className="flex items-center gap-2">
        {LanguageIcon && (
          <div className="text-neutral-500">
            <LanguageIcon className="w-4 h-4" />
          </div>
        )}
        <span className="text-sm font-medium text-neutral-600 capitalize">
          {language}
        </span>
      </div>
      <button
        className="text-neutral-400 hover:text-red-500 transition-colors duration-200 p-1.5 rounded-md hover:bg-red-50"
        onClick={onDelete}
        aria-label="Delete snippet"
      >
        <IoMdTrash className="w-4 h-4" />
      </button>
    </div>
  );
};

const EmptyState: React.FC<{
  onCreateNew?: () => void;
}> = ({ onCreateNew }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 bg-background-subtle rounded-full flex items-center justify-center mb-6">
          <Code2 className="w-12 h-12 text-primary/60" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-neutral-900 mb-3">
          No code snippets yet
        </h3>

        {/* Description */}
        <p className="text-neutral-600 leading-relaxed mb-8">
          Start building your code library by creating your first snippet. Save
          and organize your favorite code pieces for quick access.
        </p>

        {/* Call to Action */}
        <Button
          onClick={onCreateNew}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200 font-medium flex items-center gap-2 mx-auto"
        >
          <Plus className="w-4 h-4" />
          Create Your First Snippet
        </Button>

        {/* Additional Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-neutral-500">
            💡 <strong>Pro tip:</strong> You can organize snippets with tags and
            search through them easily once you start adding some.
          </p>
        </div>
      </div>
    </div>
  );
};
