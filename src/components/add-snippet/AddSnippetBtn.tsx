"use client";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { AddBtnProps } from "@/app/lib/definitions";

const AddSnippetBtn: React.FC<AddBtnProps> = ({
  openIcon = <Plus className="h-6 w-6" />,
  closeIcon = <X className="h-6 w-6" />,
  onClick,
  onOpenClick,
  onCloseClick,
  ariaLabel = "Add snippet button desktop",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (onClick) {
      onClick();
    }

    // Call the specific handler based on new state
    if (newState && onOpenClick) {
      onOpenClick();
    } else if (!newState && onCloseClick) {
      onCloseClick();
    }
  };
  return (
    <Button
      onClick={handleClick}
      aria-label={ariaLabel}
      className="hidden md:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
    >
      {isOpen ? closeIcon : openIcon}
      <span>{isOpen ? "Cancel" : "Add Snippet"}</span>
    </Button>
  );
};

export default AddSnippetBtn;
