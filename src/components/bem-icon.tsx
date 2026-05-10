import { HoverPopover } from "@/components/hover-popover";
import { useBEMFlags } from "@/hooks/useBEMFlags";

type CountryTypeIconProps = {
  type: string | null;
  description?: string;
  className?: string;
  imageClassName?: string;
};

export function BEMIcon({
  type,
  description,
  className = "inline-flex",
  imageClassName = "h-12 w-12 xl:h-16 xl:w-16 shrink-0",
}: CountryTypeIconProps) {
  const iconUrl = useBEMFlags(type);

  if (!iconUrl) return null;

  const image = (
    <img
      src={iconUrl}
      alt={type || ""}
      className={`${imageClassName} max-w-[48px] max-h-[48px]`}
      aria-label={type || ""}
    />
  );

  if (!description) {
    return <span className={className}>{image}</span>;
  }

  return (
    <HoverPopover
      trigger={image}
      triggerClassName={className}
      contentClassName="max-w-80 border border-white/20 bg-black/90 px-3 py-2 text-xs leading-relaxed text-white/90 shadow-lg"
      content={<p>{description}</p>}
    />
  );
}
