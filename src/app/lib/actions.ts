"use server";

import { signIn, signOut } from "@/auth";
import { OAuthProviderType } from "next-auth/providers";
export async function doOAuthLogin(formData: FormData) {
  const action = formData.get("action") as OAuthProviderType;

  await signIn(action, { redirectTo: "/snippets" });
}

export async function doOAuthLogout() {
  await signOut({ redirectTo: "/" });
}
