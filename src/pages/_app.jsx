import "@/styles/globals.css";

// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

const client = new QueryClient();

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionContextProvider>
  );
}