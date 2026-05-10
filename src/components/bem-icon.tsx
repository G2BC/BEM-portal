import { HoverPopover } from "@/components/hover-popover";
import { useBEMFlags } from "@/hooks/useBEMFlags";

type CountryTypeIconProps = {
  type: string | null;
  description?: string;
  className?: string;
  imageClassName?: string;
  children?: React.ReactNode;
};

export function BEMIcon({
  type,
  description,
  className = "inline-flex",
  imageClassName = "h-12 w-12 xl:h-16 xl:w-16 shrink-0",
  children,
}: CountryTypeIconProps) {
  const iconUrl = useBEMFlags(type);

  if (!iconUrl) return null;

  const trigger = (
    <>
      <img
        src={iconUrl}
        alt={type || ""}
        className={`${imageClassName} max-w-[48px] max-h-[48px]`}
        aria-label={type || ""}
      />
      {children}
    </>
  );

  if (!description) {
    return <span className={className}>{trigger}</span>;
  }

  return (
    <HoverPopover
      trigger={trigger}
      triggerClassName={className}
      contentClassName="z-[500] max-w-80 border border-white/20 bg-black/90 px-3 py-2 text-xs leading-relaxed text-white/90 shadow-lg"
      content={<p>{description}</p>}
    />
  );
}
