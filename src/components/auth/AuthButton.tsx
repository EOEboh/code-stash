import { Button } from "@/components/ui/button";
import { clsx } from "clsx";

type Variant = "primary" | "outline" | "ghost" | "dark";

interface AuthButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant"> {
  variant?: Variant;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AuthButton = ({
  variant = "primary",
  icon,
  children,
  className,
  ...props
}: AuthButtonProps) => {
  const base =
    "w-full h-12 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md";

  const variants: Record<Variant, string> = {
    primary: "bg-primary hover:bg-primary.hover text-white",
    outline:
      "bg-white hover:bg-background.soft border-2 border-neutral.500 hover:border-neutral.600 text-neutral.900",
    ghost: "text-primary hover:text-primary.hover hover:bg-background.soft",
    dark: "bg-neutral-900 hover:bg-neutral-600 text-white",
  };

  return (
    <Button className={clsx(base, variants[variant], className)} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </Button>
  );
};
