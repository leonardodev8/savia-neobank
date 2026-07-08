/**
  Shows a dot for each digit of a 6-digit code, shakes when there's an error
**/
import { useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { tokens } from "@/core/theme/tokens";

type CodeDotsProps = {
  filled: number;
  total: number;
  error?: boolean;
};

export const CodeDots = ({ filled, total, error = false }: CodeDotsProps) => {
  // Kept in state so the animated value stays stable across renders
  const [shake] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!error) return;
    Animated.sequence([
      Animated.timing(shake, {
        toValue: 1,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: -1,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 1,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 0,
        duration: 45,
        useNativeDriver: true,
      }),
    ]).start();
  }, [error, shake]);

  const translateX = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-9, 9],
  });

  return (
    <Animated.View
      className="flex-row gap-[18px]"
      style={{ transform: [{ translateX }] }}
      accessibilityRole="text"
      accessibilityLabel={`${filled} de ${total} dígitos ingresados`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < filled;
        const color = error
          ? tokens.color.expense
          : isFilled
            ? tokens.color.primary
            : tokens.color.hairline;
        return (
          <View
            key={i}
            className="h-[14px] w-[14px] rounded-full border-2"
            style={{
              borderColor: color,
              backgroundColor: isFilled || error ? color : "transparent",
            }}
          />
        );
      })}
    </Animated.View>
  );
};
