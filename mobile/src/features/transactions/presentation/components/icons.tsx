// Stroke icons used only by the movements screen
import { Circle, Path, Svg } from "react-native-svg";

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const strokeProps = (color: string, strokeWidth: number) =>
  ({
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  }) as const;

export const SearchIcon = ({
  size = 18,
  color = "#9A968E",
  strokeWidth = 2,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle {...s} cx="11" cy="11" r="7" />
      <Path {...s} d="m20 20-3-3" />
    </Svg>
  );
};
