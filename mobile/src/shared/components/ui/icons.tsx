/**
  Shared stroke icons used by the tab bar and quick actions
**/
import { Circle, Path, Rect, Svg } from "react-native-svg";
import type { ColorValue } from "react-native";

// ColorValue (not string) so navigator options like tabBarIcon can pass their color through
type IconProps = {
  size?: number;
  color?: ColorValue;
  strokeWidth?: number;
};

const strokeProps = (color: ColorValue, strokeWidth: number) =>
  ({
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  }) as const;

export const HomeIcon = ({
  size = 25,
  color = "#9A968E",
  strokeWidth = 1.9,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path {...s} d="M3.5 10.5 12 4l8.5 6.5" />
      <Path
        {...s}
        d="M5.5 9.5V19a1 1 0 0 0 1 1H10v-5h4v5h3.5a1 1 0 0 0 1-1V9.5"
      />
    </Svg>
  );
};

export const MovementsIcon = ({
  size = 25,
  color = "#9A968E",
  strokeWidth = 1.9,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path {...s} d="M8 7h11M8 12h11M8 17h11" />
      <Circle cx="4" cy="7" r="0.9" fill={color} />
      <Circle cx="4" cy="12" r="0.9" fill={color} />
      <Circle cx="4" cy="17" r="0.9" fill={color} />
    </Svg>
  );
};

export const CardsIcon = ({
  size = 25,
  color = "#9A968E",
  strokeWidth = 1.9,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect {...s} x="3" y="6" width="18" height="12" rx="2.5" />
      <Path {...s} d="M3 10h18" />
      <Path {...s} d="M6.5 14.5h3" />
    </Svg>
  );
};

export const ProfileIcon = ({
  size = 25,
  color = "#9A968E",
  strokeWidth = 1.9,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle {...s} cx="12" cy="8.5" r="3.3" />
      <Path {...s} d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
    </Svg>
  );
};

export const TransferArrowsIcon = ({
  size = 25,
  color = "#FFFFFF",
  strokeWidth = 2,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path {...s} d="M8 4.5v15M8 4.5 4.5 8M8 4.5 11.5 8" />
      <Path {...s} d="M16 19.5v-15M16 19.5 12.5 16M16 19.5 19.5 16" />
    </Svg>
  );
};
