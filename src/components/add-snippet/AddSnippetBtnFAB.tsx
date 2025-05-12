"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddBtnProps } from "@/app/lib/definitions";
import { useIsMobile } from "@/hooks/use-mobile";

const AddSnippetBtnFAB: React.FC<AddBtnProps> = ({
  openIcon = <Plus className="h-6 w-6" />,
  closeIcon = <X className="h-6 w-6" />,
  onClick,
  onOpenClick,
  onCloseClick,
  className,
  ariaLabel = "Add snippet button mobile",
  color = "primary",
  size = "default",
  showOnDesktop = false,
}) => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Add a small delay before showing the button for a smoother experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isMobile && !showOnDesktop) {
    return null;
  }

  const handleClick = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    // Call the general onClick if provided
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

  const colorVariants = {
    default: "bg-background text-foreground hover:bg-muted",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  const sizeVariants = {
    sm: "h-12 w-12",
    default: "h-14 w-14",
    lg: "h-16 w-16",
  };

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        colorVariants[color],
        sizeVariants[size],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      <div
        className={cn(
          "transition-transform duration-300",
          isOpen ? "rotate-0" : "rotate-0"
        )}
      >
        {isOpen ? closeIcon : openIcon}
      </div>
    </button>
  );
};
export default AddSnippetBtnFAB;
