import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface HoverPopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  triggerWrapper?: "span" | "div";
}

export function HoverPopover({
  trigger,
  content,
  triggerClassName,
  contentClassName,
  triggerWrapper = "span",
}: HoverPopoverProps) {
  const [open, setOpen] = useState(false);
  const TriggerWrapper = triggerWrapper;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <TriggerWrapper
          className={cn(
            !triggerClassName && "underline decoration-dotted",
            "cursor-pointer select-none",
            triggerClassName
          )}
          onPointerDown={(e) => e.preventDefault()}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {trigger}
        </TriggerWrapper>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-auto rounded-md border-none bg-foreground px-3 py-1.5 text-xs text-background",
          contentClassName
        )}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}
