import type { ExpoConfig } from "@expo/config";





const CLERK_PUBLISHABLE_KEY =
  "pk_test_b3B0aW11bS1tYXJ0ZW4tNTkuY2xlcmsuYWNjb3VudHMuZGV2JA";
const defineConfig = (): ExpoConfig => ({
  name: "farmaceutic-app",
  slug: "expo",
  scheme: "expo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#0F0326",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "your.bundle.identifier",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#0F0326",
    },
    package: "fama.app.farmaceutic",
    versionCode: 1,
    userInterfaceStyle: "light",
  },
  extra: {
    eas: {
      projectId: "df0d2e07-6f19-41a9-816c-f75313fd9dc9",
    },
    clerkPublishableKey: CLERK_PUBLISHABLE_KEY,
  },
  experiments: {
    tsconfigPaths: true,
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;