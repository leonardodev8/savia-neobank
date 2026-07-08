/**
  Feature-local icons
**/
import { Path, Rect, Svg } from "react-native-svg";

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export const FaceIdIcon = ({
  size = 42,
  color = "#FFFFFF",
  strokeWidth = 1.7,
}: IconProps) => {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  } as const;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path {...s} d="M4 8V6.5A2.5 2.5 0 0 1 6.5 4H8" />
      <Path {...s} d="M16 4h1.5A2.5 2.5 0 0 1 20 6.5V8" />
      <Path {...s} d="M20 16v1.5a2.5 2.5 0 0 1-2.5 2.5H16" />
      <Path {...s} d="M8 20H6.5A2.5 2.5 0 0 1 4 17.5V16" />
      <Path {...s} d="M9 10v1M15 10v1" />
      <Path {...s} d="M12 9.5v3.5h-1" />
      <Path {...s} d="M9 15.5s1.1 1 3 1 3-1 3-1" />
    </Svg>
  );
};

export const FingerprintIcon = ({
  size = 42,
  color = "#FFFFFF",
  strokeWidth = 1.7,
}: IconProps) => {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  } as const;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path {...s} d="M5.5 8.5a8 8 0 0 1 13 0" />
      <Path {...s} d="M12 6.5a6 6 0 0 1 6 6v1" />
      <Path {...s} d="M6 12.5a6 6 0 0 1 9.5-4.9" />
      <Path {...s} d="M9 12a3 3 0 0 1 6 0v2a8 8 0 0 0 .7 3.3" />
      <Path {...s} d="M12 12v2a8 8 0 0 0 1.4 4.6" />
      <Path {...s} d="M9 14.5a8 8 0 0 0 1.8 5" />
      <Path {...s} d="M6.6 16a8 8 0 0 1-.6-3" />
    </Svg>
  );
};

export const BackspaceIcon = ({
  size = 26,
  color = "#1C1B19",
  strokeWidth = 1.7,
}: IconProps) => {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  } as const;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        {...s}
        d="M21 5H8.5a2 2 0 0 0-1.5.7l-4.2 5a1 1 0 0 0 0 1.3l4.2 5a2 2 0 0 0 1.5.7H21a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z"
      />
      <Path {...s} d="M12 9.5l5 5M17 9.5l-5 5" />
    </Svg>
  );
};

export const ChevronLeftIcon = ({
  size = 24,
  color = "#1C1B19",
  strokeWidth = 2,
}: IconProps) => {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  } as const;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path {...s} d="M15 6l-6 6 6 6" />
    </Svg>
  );
};

export const LockIcon = ({
  size = 13,
  color = "#9A968E",
  strokeWidth = 2,
}: IconProps) => {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  } as const;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect {...s} x="5" y="11" width="14" height="9" rx="2" />
      <Path {...s} d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Svg>
  );
};
