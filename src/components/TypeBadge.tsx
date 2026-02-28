import { getTypeColor } from "@/lib/type-colors";

interface TypeBadgeProps {
  type: string;
  size?: "sm" | "md";
}

export default function TypeBadge({ type, size = "md" }: TypeBadgeProps) {
  const colors = getTypeColor(type);
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`${colors.bg} ${colors.text} ${sizeClass} rounded-full font-semibold capitalize inline-block`}
    >
      {type}
    </span>
  );
}
