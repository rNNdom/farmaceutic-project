import React, { useContext } from "react";
import Constants from "expo-constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";
import type { AppRouter } from "@acme/api";
import { getTokenFromAsyncStorage } from "~/components/storage";
import { UserContext } from "~/components/userContext";

export const api = createTRPCReact<AppRouter>();
export { type RouterInputs, type RouterOutputs } from "@acme/api";

const getBaseUrl = () => {
  // const debuggerHost = Constants.expoConfig?.hostUri;
  // const localhost = debuggerHost?.split(":")[0];



  // if (!localhost) {
  //   throw new Error(
  //     "Failed to get localhost. Please point to your production server.",
  //   );
  // }
  return `https://farmaceutic-project-nextjs.vercel.app`;
};


export let token = "a"
export const setToken = (newToken: string) => {
  token = newToken
}
const tokenFromLocalStorage = getTokenFromAsyncStorage("@token")
if (tokenFromLocalStorage.then) {
  tokenFromLocalStorage.then((value) => {
    token = value as string;
  });
}
/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */

export function TRPCProvider(props: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Map<string, string>();
            headers.set("x-trpc-source", "expo-react");
            headers.set("Authorization", `Bearer ${token}`);
            return Object.fromEntries(headers);
          },
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}
