/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Pressable as DefaultPressable,
  Text as DefaultText,
  Touchable as DefaultTouchable,
  View as DefaultView,
  useColorScheme,
} from "react-native";
import { SafeAreaView as SafeAreaViewDefault } from "react-native-safe-area-context";
import { Ionicons as DefaultIonicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

// export text color

export function Ionicons(props: any) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultIonicons {...otherProps} color={color} />;
}

// safe area view

export function SafeAreaView(props: any) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <SafeAreaViewDefault style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

// pressable

export function Pressable(props: any) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <DefaultPressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#ebebeb" : backgroundColor,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
