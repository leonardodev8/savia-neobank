/**
  Stroke icons used only by the home
**/
import { Circle, Path, Rect, Svg } from "react-native-svg";

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

export const BellIcon = ({
  size = 20,
  color = "#1C1B19",
  strokeWidth = 1.8,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path {...s} d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
      <Path {...s} d="M10 19a2 2 0 0 0 4 0" />
    </Svg>
  );
};

export const EyeIcon = ({
  size = 19,
  color = "#FFFFFF",
  strokeWidth = 1.8,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path {...s} d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <Circle {...s} cx="12" cy="12" r="2.6" />
    </Svg>
  );
};

export const EyeOffIcon = ({
  size = 19,
  color = "#FFFFFF",
  strokeWidth = 1.8,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        {...s}
        d="M10.7 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.9 3.9"
      />
      <Path
        {...s}
        d="M6.2 6.2A16.8 16.8 0 0 0 2 12s3.5 7 10 7c1.6 0 3-.4 4.3-1"
      />
      <Path {...s} d="M9.9 9.9a2.6 2.6 0 0 0 3.7 3.7" />
      <Path {...s} d="M4 4l16 16" />
    </Svg>
  );
};

export const RechargeIcon = ({
  size = 23,
  color = "#0B6B5B",
  strokeWidth = 1.9,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect {...s} x="6" y="3" width="12" height="18" rx="2.5" />
      <Path {...s} d="M11 7h2M10.5 17.5h3" />
    </Svg>
  );
};

export const PayIcon = ({
  size = 23,
  color = "#0B6B5B",
  strokeWidth = 1.9,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect {...s} x="4" y="7" width="16" height="11" rx="2" />
      <Path {...s} d="M4 10h16M7.5 14.5h4" />
    </Svg>
  );
};

export const MoreDotsIcon = ({
  size = 23,
  color = "#0B6B5B",
  strokeWidth = 1.9,
}: IconProps) => {
  const s = strokeProps(color, strokeWidth);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle {...s} cx="5.5" cy="12" r="1.6" />
      <Circle {...s} cx="12" cy="12" r="1.6" />
      <Circle {...s} cx="18.5" cy="12" r="1.6" />
    </Svg>
  );
};
