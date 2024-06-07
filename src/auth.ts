import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [Google];

export const { signIn, signOut, auth, handlers } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Google],
  
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    //http://localhost:3000/dashboard/share/clwwbvbn30000foblxzukw62x
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      console.log(url,baseUrl)
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
});

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});
